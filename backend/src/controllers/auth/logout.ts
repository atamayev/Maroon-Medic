import { Response, Request } from "express"
import Cookie from "../../utils/cookie-operations"
import { handleLogoutInDB } from "../../utils/auth-helpers"

export default async function logout(req: Request, res: Response): Promise<Response> {
	const UUID = req.headers.uuid as string

	await handleLogoutInDB(UUID)

	try {
		Cookie.clearAll(res)
		return res.status(200).json()
	} catch (error: unknown) {
		return res.status(500).json({ error: "Error logging user out" })
	}
}
