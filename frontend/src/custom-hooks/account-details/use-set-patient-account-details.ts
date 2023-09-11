import _ from "lodash"
import { useContext, useEffect } from "react"
import { AppContext } from "src/contexts/maroon-context"
import fetchPatientAccountDetails from "src/custom-hooks/account-details/fetch/use-fetch-patient-account-details"
import fetchPatientLists from "src/custom-hooks/account-details/fetch/use-fetch-patient-lists"

export function usePatientAccountDetails(
	setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
	setListDetails: React.Dispatch<React.SetStateAction<PatientListDetails>>,
	userType: DoctorOrPatientOrNull
): void {
	const appContext = useContext(AppContext)

	const fetchAndSetAccountDetails: () => void = async () => {
		try {
			if (_.isNull(appContext.patientAccountDetails)) {
				await fetchPatientAccountDetails(setSpokenLanguages)
			}

			if (_.isNull(appContext.patientLists)) {
				await fetchPatientLists(setListDetails)
			} else setListDetails(appContext.patientLists)
		} catch (error) {
		}
	}

	useEffect(() => {
		if (userType !== "Patient") return
		fetchAndSetAccountDetails()
	}, [userType])
}
