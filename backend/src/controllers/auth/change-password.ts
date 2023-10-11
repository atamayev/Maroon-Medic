import { Response, Request } from "express"
import AuthDB from "../../db/auth-db"
import Hash from "../../setup-and-security/hash"
import { UUID_to_ID } from "../../setup-and-security/UUID"

export default async function changePassword (req: Request, res: Response): Promise<Response> {
	const { currentPassword, newPassword } = req.body.changePasswordObject as ChangePasswordObject
	const UUID = req.headers.uuid as string

	let userId: number
	try {
		userId = await UUID_to_ID(UUID)
	} catch (error: unknown) {
		return res.status(401).json({ shouldRedirect: true, redirectURL: "/" })
	}

	try {
		const hashedOldPassword = await AuthDB.retrieveUserPassword(userId)
		const isOldPasswordMatch = await Hash.checkPassword(currentPassword, hashedOldPassword)
		if (!isOldPasswordMatch) return res.status(400).json({ error: "Old Password is incorrect" })
		else {
			const isSamePassword = await Hash.checkPassword(newPassword, hashedOldPassword)
			if (isSamePassword) return res.status(402).json({ error: "New Password cannot be the same as the old password" })

			const newHashedPassword = await Hash.hashCredentials(newPassword)
			await AuthDB.updatePassword(newHashedPassword, userId)
			return res.status(200).json()
		}
	} catch (error: unknown) {
		return res.status(500).json({ error: "Errror in changing password" })
	}
}
