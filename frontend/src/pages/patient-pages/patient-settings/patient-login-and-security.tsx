import { useContext } from "react"
import { observer } from "mobx-react"
import LoginHistory from "../../../components/login-history"
import ChangePassword from "../../../components/change-password/change-password"
import useSetLoginHistory from "../../../custom-hooks/use-set-login-history"
import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"
import PatientHeader from "../patient-header"
import { AppContext } from "src/contexts/maroon-context"

function PatientLoginAndSecurity() {
	const { userType } = useContext(AppContext)
	const loginHistory = useSetLoginHistory(userType, "Patient")

	if (userType !== "Patient") return <UnauthorizedUser vetOrpatient = {"patient"}/>

	return (
		<>
			<PatientHeader/>
			<ChangePassword type = {userType}/>
			{loginHistory.map((item, index) => (
				<LoginHistory key = {index} loginHistoryItem = {item} />
			))}
		</>
	)
}

export default observer(PatientLoginAndSecurity)
