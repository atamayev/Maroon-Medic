import { useContext } from "react"
import { observer } from "mobx-react"
import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"
import { usePatientAccountDetails } from "src/custom-hooks/account-details/use-set-patient-account-details"
import PatientHeader from "../patient-header"
import AppContext from "src/contexts/maroon-context"
import PatientLanguageSection from "./language"

function PatientAccountDetails() {
	const appContext = useContext(AppContext)
	usePatientAccountDetails()

	if (appContext.auth.userType !== "Patient") return <UnauthorizedUser vetOrpatient = {"patient"}/>

	return (
		<div>
			<PatientHeader/>
			<PatientLanguageSection />
		</div>
	)
}

export default observer(PatientAccountDetails)
