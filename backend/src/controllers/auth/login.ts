import _ from "lodash"
import { Response, Request } from "express"
import AuthDB from "../../db/auth-db"
import Hash from "../../setup-and-security/hash"
import { loginHistory } from "../../utils/account-tracker"
import Cookie from "../../utils/cookie-operations"
import { ID_to_UUID } from "../../setup-and-security/UUID"
import { validateUserType, signJWT } from "../../utils/auth-helpers"

export default async function login (req: Request, res: Response): Promise<Response> {
	const { email, password, loginType } = req.body.loginInformationObject

	if (!validateUserType(loginType)) return res.status(400).json("Invalid User Type")

	let results: UserIdAndPassword
	let hashedPassword: string

	try {
		results = await AuthDB.retrieveUserIdAndPassword(email, loginType)
		if (_.isEmpty(results)) return res.status(404).json({ error: "Username not found!" })
		else hashedPassword = results.password
	} catch (error: unknown) {
		return res.status(500).json({ error: "Problem with email selection" })
	}

	let bool: boolean

	try {
		bool = await Hash.checkPassword(password, hashedPassword)
	} catch (error: unknown) {
		return res.status(500).json({ error: "Problem with checking password" })
	}

	if (bool === false) return res.status(400).json({ error: "Wrong Username or Password!" })
	const idKey = `${loginType}UUID`
	const UUID = await ID_to_UUID(results.userId)
	const payload: JwtPayload = {
		[idKey]: UUID,
		newUser: false
	}

	const token = signJWT(payload, loginType)
	if (!token) return res.status(500).json({ error: "Problem with Signing JWT" })

	await loginHistory(results.userId)

	Cookie.clearAll(res)

	return res
		.cookie("AccessToken", token)
		.status(200)
		.json({ authenticated: true, userType: loginType })
}
