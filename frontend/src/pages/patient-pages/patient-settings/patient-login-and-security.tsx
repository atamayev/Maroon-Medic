import LoginHistory from "../../../components/login-history"
import ChangePassword from "../../../components/change-password/change-password"
import useSetLoginHistory from "../../../custom-hooks/use-set-login-history"
import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"
import Header from "../../../components/header/header"
import PatientHeader from "../patient-header"

export default function PatientLoginAndSecurity() {
  const { userType } = useSimpleUserVerification()
  const loginHistory = useSetLoginHistory(userType, "Patient")

  if (userType !== "Patient") return <UnauthorizedUser vetOrpatient = {"patient"}/>

  return (
    <>
      <Header dropdown = {true}/>
      <PatientHeader/>
      <ChangePassword type = {userType}/>
      {loginHistory.map((item, index) => (
        <LoginHistory key = {index} loginHistoryItem = {item} />
      ))}
    </>
  )
}
