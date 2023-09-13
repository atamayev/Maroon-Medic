import { useContext } from "react"
import { observer } from "mobx-react"
import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"
import { usePatientAccountDetails } from "src/custom-hooks/account-details/use-set-patient-account-details"
import PatientHeader from "../patient-header"
import PatientLanguageSection from "./language"
import { AppContext } from "src/contexts/maroon-context"

function PatientAccountDetails() {
	const appContext = useContext(AppContext)
	usePatientAccountDetails()

	if (appContext.userType !== "Patient") return <UnauthorizedUser vetOrpatient = {"patient"}/>

	return (
		<div>
			<PatientHeader/>
			<PatientLanguageSection />
		</div>
	)
}

export default observer(PatientAccountDetails)
