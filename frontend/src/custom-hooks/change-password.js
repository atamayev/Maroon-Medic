import AuthDataService from "../services/auth-data-service"

export const handleChangePassword = async (
  changePasswordObject,
  setCredentials,
  setMessage,
  setLoading,
  type
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
        Object.keys(changePasswordObject).forEach(key => delete changePasswordObject[key])
        changePasswordObject.userType = type
        setCredentials(changePasswordObject)
      }
    } catch (error) {
      setMessage(error.response.data)
    } finally {
      setLoading(false)
    }
  }
}
