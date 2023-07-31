import AuthDataService from "../services/auth-data-service"
type LoginOrRegisterType = DoctorOrPatient

interface ChangePasswordObject {
  userType: DoctorOrPatient
  currentPassword: string
  newPassword: string
  newConfirmPassword: string
}

export const handleChangePassword = async (
  changePasswordObject: ChangePasswordObject,
  setCredentials: React.Dispatch<React.SetStateAction<{
    userType: DoctorOrPatient
    currentPassword: string
    newPassword: string
    newConfirmPassword: string}>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  type: LoginOrRegisterType
) => {
  setMessage("")
  if (changePasswordObject.newPassword !== changePasswordObject.newConfirmPassword) return setMessage("New passwords don't match")
  else {
    try {
      setLoading(true)
      const response = await AuthDataService.changePassword(changePasswordObject)
      if (response.status !== 200) setMessage("Password change didn't work")
      else {
        setMessage("Password changed successfully")
        setCredentials({ userType: type, currentPassword: "", newPassword: "", newConfirmPassword: "" })
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message)
      } else {
        setMessage("An unexpected error occurred.")
      }
    } finally {
      setLoading(false)
    }
  }
}
