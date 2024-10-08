import _ from "lodash"
import { useContext, useEffect } from "react"
import AppContext from "src/contexts/maroon-context"
import useFetchPatientAccountDetails from "src/custom-hooks/account-details/fetch/use-fetch-patient-account-details"
import useFetchPatientLists from "src/custom-hooks/account-details/fetch/use-fetch-patient-lists"

export function usePatientAccountDetails(): void {
	const appContext = useContext(AppContext)
	const fetchPatientAccountDetails = useFetchPatientAccountDetails()
	const fetchPatientLists = useFetchPatientLists()

	const fetchAndSetAccountDetails: () => void = async () => {
		if (_.isNull(appContext.patientData)) return
		try {
			if (_.isNull(appContext.patientData.patientAccountDetails)) {
				await fetchPatientAccountDetails()
			}

			if (_.isNull(appContext.patientData.patientLists)) {
				await fetchPatientLists()
			}
		} catch (error) {
		}
	}

	useEffect(() => {
		if (appContext.auth.userType !== "Patient") return
		fetchAndSetAccountDetails()
	}, [appContext.auth.userType])
}
