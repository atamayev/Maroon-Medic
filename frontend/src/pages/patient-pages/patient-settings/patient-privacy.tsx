import { useContext } from "react"
import PatientHeader from "../patient-header"
import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"
import { AppContext } from "src/contexts/maroon-context"
import { observer } from "mobx-react"

function PatientPrivacy() {
	const { userType } = useContext(AppContext)

	if (userType !== "Patient") return <UnauthorizedUser vetOrpatient = {"patient"}/>

	return (
		<>
			<PatientHeader/>
			PatientPrivacy
		</>
	)
}

export default observer(PatientPrivacy)
