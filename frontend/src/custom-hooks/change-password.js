import AuthDataService from "../services/auth-data-service";

export const handleChangePassword = async (
  changePasswordObject,
  setMessage,
  setLoading
) => {
  setMessage("")
  if (changePasswordObject.newPassword !== changePasswordObject.newConfirmPassword) return setMessage("New passwords don't match")
  else {
    try {
      setLoading(true)
      const response = await AuthDataService.changePassword(changePasswordObject);
      if (response.status === 200) setMessage("Password changed successfully")
      else setMessage("Password change didn't work");
    } catch (error) {
      setMessage(error.response.data);
    }
    setLoading(false)
  }
}
