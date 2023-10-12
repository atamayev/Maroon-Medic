import _ from "lodash"
import { useEffect, useContext } from "react"
import AppContext from "src/contexts/maroon-context"
import useFetchInsurancesList from "src/custom-hooks/my-pets/use-fetch-insurances-list"
import useFetchPetData from "src/custom-hooks/my-pets/use-fetch-pet-data"
import useFetchPetTypesList from "src/custom-hooks/my-pets/use-fetch-pet-types-list"
import useFetchPetMedicationsList from "../my-pets/use-fetch-pet-medications-list"
import useFetchPetProceduresList from "../my-pets/use-fetch-pet-procedures-list"

export default function useFetchAllPetData(): void {
	const appContext = useContext(AppContext)

	const fetchPetTypesList = useFetchPetTypesList()
	const fetchInsurancesList = useFetchInsurancesList()
	const fetchPetMedicationsList = useFetchPetMedicationsList()
	const fetchPetProceduresList = useFetchPetProceduresList()
	const fetchPetData = useFetchPetData()

	const getPetData: () => void = async () => {
		if (_.isNull(appContext.patientData)) return
		try {
			if (_.isNull(appContext.patientData.petTypes)) {
				await fetchPetTypesList()
			}
			if (_.isNull(appContext.patientData.insurances)) {
				await fetchInsurancesList()
			}
			if (_.isNull(appContext.patientData.petMedications)) {
				await fetchPetMedicationsList()
			}
			if (_.isNull(appContext.patientData.petProcedures)) {
				await fetchPetProceduresList()
			}
			if (_.isEmpty(appContext.patientData.patientPetData)) {
				await fetchPetData()
			}
		} catch (error) {
		}
	}

	useEffect(() => {
		if (appContext.auth.userType !== "Patient") return
		getPetData()
	}, [appContext.auth.userType])
}
