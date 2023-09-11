import { observer } from "mobx-react"
import LoginHistory from "../../../components/login-history"
import ChangePassword from "../../../components/change-password/change-password"
import useSetLoginHistory from "../../../custom-hooks/use-set-login-history"
import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"
import DoctorHeader from "../doctor-header"
import { useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"

function DoctorLoginAndSecurity () {
	const { userType } = useContext(AppContext)
	const loginHistory = useSetLoginHistory(userType, "Doctor")

	if (userType !== "Doctor") return <UnauthorizedUser vetOrpatient = {"vet"}/>

	return (
		<>
			<DoctorHeader/>
			<ChangePassword type = {userType}/>
			{loginHistory.map((item, index) => (
				<LoginHistory key = {index} loginHistoryItem = {item} />
			))}
			{/* Later add update history here as well. Create an update history table which has the login_history table as a foreign key.
      Within each login session, show what the user changed. */}
		</>
	)
}

export default observer(DoctorLoginAndSecurity)
