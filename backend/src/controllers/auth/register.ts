import { Response, Request } from "express"
import AuthDB from "../../db/auth-db"
import TimeUtils from "../../utils/time"
import { loginHistory } from "../../utils/account-tracker"
import Cookie from "../../utils/cookie-operations"
import { ID_to_UUID } from "../../setup-and-security/UUID"
import {
	validateUserType,
	signJWT,
	doesAccountExist,
	hashPassword
} from "../../utils/auth-helpers"

export default async function register (req: Request, res: Response): Promise<Response> {
	const {email, password, loginType } = req.body.registerInformationObject

	if (!validateUserType(loginType)) return res.status(400).json("Invalid User Type")

	const { exists, accountExistError } = await doesAccountExist(email, loginType)
	if (accountExistError) return res.status(500).json({ error: accountExistError })
	else if (exists) return res.status(400).json("Email already exists!")

	const {hashedPassword, hashError} = await hashPassword(password)
	if (hashError) return res.status(500).json({ error: hashError })

	const createdAt = TimeUtils.createFormattedDate()

	let userId: number
	try {
		userId = await AuthDB.addNewUserCredentials(email, hashedPassword, createdAt, loginType)
	} catch (error: unknown) {
		return res.status(500).json({ error: "Problem with Data Insertion" })
	}

	if (loginType === "Doctor") {
		try {
			await AuthDB.addDoctorSpecificDetails(userId)
		} catch (error: unknown) {
			return res.status(500).json({ error: "Problem with Data Insertion" })
		}
	}

	const idKey = `${loginType}Id`
	const UUID = await ID_to_UUID(userId)
	const payload = { [idKey]: UUID }

	const token = signJWT(payload, loginType)
	if (!token) return res.status(500).json({ error: "Problem with Signing JWT" })

	const newUserUUID = await ID_to_UUID(userId)
	await loginHistory(userId)

	Cookie.clearAll(res, loginType)

	return res
		.cookie(`${loginType}AccessToken`, token)
		.cookie(`${loginType}UUID`, UUID)
		.cookie(`${loginType}NewUser`, newUserUUID)
		.status(200)
		.json()
}
