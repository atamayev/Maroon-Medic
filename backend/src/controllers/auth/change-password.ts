import { Response, Request } from "express"
import AuthDB from "../../db/auth-DB"
import Hash from "../../setup-and-security/hash"
import { UUID_to_ID } from "../../setup-and-security/UUID"

export default async function changePassword (req: Request, res: Response): Promise<Response> {
	const {userType, currentPassword, newPassword} = req.body.changePasswordObject
	const cookies = req.cookies
	let UUID: string = ""

	if (userType !== "Doctor" && userType !== "Patient") return res.status(401).json({ shouldRedirect: true, redirectURL: "/" })
	else if (userType === "Doctor") UUID = cookies.DoctorUUID
	else if (userType === "Patient") UUID = cookies.PatientUUID

	let UserID: number
	try {
		UserID = await UUID_to_ID(UUID)
	} catch (error: unknown) {
		return res.status(401).json({ shouldRedirect: true, redirectURL: "/" })
	}

	try {
		const hashedOldPassword = await AuthDB.retrieveUserPassword(UserID)
		const isOldPasswordMatch = await Hash.checkPassword(currentPassword, hashedOldPassword)
		if (!isOldPasswordMatch) return res.status(400).json("Old Password is incorrect")
		else {
			const isSamePassword = await Hash.checkPassword(newPassword, hashedOldPassword)
			if (isSamePassword) return res.status(402).json("New Password cannot be the same as the old password")

			const newHashedPassword = await Hash.hashCredentials(newPassword)
			await AuthDB.updatePassword(newHashedPassword, UserID)
			return res.status(200).json()
		}
	} catch (error: unknown) {
		return res.status(500).json("Errror in changing password")
	}
}
