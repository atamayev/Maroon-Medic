import LoginHistory from "../../../components/login-history"
import ChangePassword from "../../../components/change-password"
import { useLoginHistory } from "../../../custom-hooks/login-history"
import { UnauthorizedUser } from "../../../components/user-type-unauth"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"
import Header from "../../header"
import PatientHeader from "../patient-header"

export default function PatientLoginAndSecurity() {
  const { userType } = useSimpleUserVerification()

  const loginHistory = useLoginHistory(userType, "Patient")

  if (userType !== "Patient") return <UnauthorizedUser vetOrpatient = {"patient"}/>

  return (
    <>
      <Header dropdown = {true}/>
      <PatientHeader/>
      <ChangePassword type = {userType}/>
      <h1>Login History</h1>
      {loginHistory.map((item) => (
        <LoginHistory key = {item.login_historyID} loginHistoryItem = {item} />
      ))}
    </>
  )
}
