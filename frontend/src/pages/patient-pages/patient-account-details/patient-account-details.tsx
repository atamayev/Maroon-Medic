import { observer } from "mobx-react"
import { useContext, useState } from "react"
import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"
import { usePatientAccountDetails } from "src/custom-hooks/account-details/use-set-patient-account-details"
import PatientHeader from "../patient-header"
import PatientLanguageSection from "./language"
import { AppContext } from "src/contexts/maroon-context"

function PatientAccountDetails() {
	const appContext = useContext(AppContext)
	const [listDetails, setListDetails] = useState({} as PatientListDetails)
	const [spokenLanguages, setSpokenLanguages] = useState<LanguageItem[]>(appContext.patientAccountDetails?.languages || [])

	usePatientAccountDetails(setSpokenLanguages, setListDetails, appContext.userType)

	if (appContext.userType !== "Patient") return <UnauthorizedUser vetOrpatient = {"patient"}/>

	return (
		<div>
			<PatientHeader/>
			<PatientLanguageSection
				listDetails = {listDetails}
				spokenLanguages = {spokenLanguages}
				setSpokenLanguages = {setSpokenLanguages}
			/>
		</div>
	)
}

export default observer(PatientAccountDetails)
