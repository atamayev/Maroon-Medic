import { Response, Request } from "express"
import Cookie from "../../utils/cookie-operations"
import {
	getUserInfo,
	handleLogoutInDB,
} from "../../utils/auth-helpers"

export default async function logout(req: Request, res: Response): Promise<Response> {
	const { type, UUID, newUserUUID } = getUserInfo(req.cookies)

	await handleLogoutInDB(UUID, newUserUUID)

	try {
		Cookie.clearAll(res, type)
		return res.status(200).json()
	} catch (error: unknown) {
		return res.status(500).json({ error: `Error in logging ${type} out` })
	}
}
