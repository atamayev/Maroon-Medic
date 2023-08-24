import _ from "lodash"
import { Response, Request } from "express"
import AuthDB from "../../db/auth-DB"
import Hash from "../../setup-and-security/hash"
import { loginHistory } from "../../utils/account-tracker"
import Cookie from "../../utils/cookie-operations"
import { ID_to_UUID } from "../../setup-and-security/UUID"
import {
	validateUserType,
	signJWT,
} from "../../utils/auth-helpers"

export default async function login (req: Request, res: Response): Promise<Response> {
	const { email, password, loginType } = req.body.loginInformationObject

	if (!validateUserType(loginType)) return res.status(400).json("Invalid User Type")

	let results: UserIDAndPassword
	let hashedPassword: string

	try {
		results = await AuthDB.retrieveUserIDAndPassword(email, loginType)
		if (_.isEmpty(results)) return res.status(404).json("Username not found!")
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

	if (bool === false) return res.status(400).json("Wrong Username or Password!")
	const IDKey = `${loginType}ID`
	const UUID = await ID_to_UUID(results.UserID)
	const payload = { [IDKey]: UUID }

	const token = signJWT(payload, loginType)
	if (!token) return res.status(500).json({ error: "Problem with Signing JWT" })

	await loginHistory(results.UserID)

	Cookie.clearAll(res, loginType)

	// const expires = new Date(Date.now() + expirationTime *1000)

	return res
		.cookie(`${loginType}AccessToken`, token)
		.cookie(`${loginType}UUID`, UUID)
		.status(200)
		.json()
}

