import LoginHistory from "../../../components/login-history"
import ChangePassword from "../../../components/change-password"
import { useLoginHistory } from "../../../custom-hooks/login-history"
import { UnauthorizedUser } from "../../../components/user-type-unauth"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"
import Header from "../../header"
import DoctorHeader from "../doctor-header"

export default function DoctorLoginAndSecurity() {
  const { userType } = useSimpleUserVerification()
  if (userType !== "Doctor") return <UnauthorizedUser patientOrDoctor = {"vet"}/>
  const loginHistory = useLoginHistory(userType)

  return (
    <>
      <Header dropdown = {true}/>
      <DoctorHeader/>
      <ChangePassword type = {userType}/>
      <h1>Login History</h1>
      {loginHistory.map((item) => (
        <LoginHistory key = {item.login_historyID} loginHistoryItem = {item} />
      ))}
      {/* Later add update history here as well. Create an update history table which has the login_history table as a foreign key.
      Within each login session, show what the user changed. */}
    </>
  )
}
