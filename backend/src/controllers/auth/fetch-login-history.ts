import { Response, Request } from "express"
import AuthDB from "../../db/auth-db"
import Cookie from "../../utils/cookie-operations"
import { UUID_to_ID } from "../../setup-and-security/UUID"

export default async function fetchLoginHistory (req: Request, res: Response): Promise<Response> {
	const UUID = req.headers.uuid as string

	try {
		const userId = await UUID_to_ID(UUID)
		const loginHistoryRecords = await AuthDB.retrieveLoginHistory(userId)
		return res.status(200).json(loginHistoryRecords)
	} catch (error: unknown) {
		Cookie.clearAll(res)
		return res.status(401).json({ shouldRedirect: true, redirectURL: "/" })
	}
}

