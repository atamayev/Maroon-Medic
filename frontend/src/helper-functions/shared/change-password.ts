import AuthDataService from "../../services/auth-data-service"
import axios from "axios"

const changePassword = async (
	changePasswordObject: ChangePasswordObject,
	setCredentials: React.Dispatch<React.SetStateAction<ChangePasswordObject>>,
	setMessage: React.Dispatch<React.SetStateAction<string>>,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>,
	type: DoctorOrPatient
): Promise<void> => {
	setMessage("")
	if (changePasswordObject.newPassword !== changePasswordObject.newConfirmPassword) return setMessage("New passwords don't match")
	else {
		try {
			setLoading(true)
			const response = await AuthDataService.changePassword(changePasswordObject)
			if (response.status === 400) {
				setMessage("Old Password is incorrect")
			} if (response.status === 402) {
				setMessage("New Password cannot be the same as the old password")
			} else if (response.status !== 200) {
				setMessage("Password change didn't work")
			} else {
				setMessage("Password changed successfully")
				setCredentials({ userType: type, currentPassword: "", newPassword: "", newConfirmPassword: "" })
			}
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				setMessage(error.response?.data || "An unexpected error occurred.")
			} else {
				setMessage("An unexpected error occurred.")
			}
		} finally {
			setLoading(false)
		}
	}
}

export default changePassword
