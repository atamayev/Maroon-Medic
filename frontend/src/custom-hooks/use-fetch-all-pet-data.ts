import _ from "lodash"
import { useEffect, useContext } from "react"
import AppContext from "src/contexts/maroon-context"
import useFetchInsurancesList from "src/custom-hooks/my-pets/use-fetch-insurances-list"
import useFetchPetData from "src/custom-hooks/my-pets/use-fetch-pet-data"
import useFetchPetTypesList from "src/custom-hooks/my-pets/use-fetch-pet-types-list"

export default function useFetchAllPetData(): void {
	const appContext = useContext(AppContext)

	const fetchPetTypesList = useFetchPetTypesList()
	const fetchInsurancesList = useFetchInsurancesList()
	const fetchPetData = useFetchPetData()

	const getPetData: () => void = async () => {
		try {
			if (_.isNull(appContext.patientData.petTypes)) {
				await fetchPetTypesList()
			}
			if (_.isNull(appContext.patientData.insurances)) {
				await fetchInsurancesList()
			}
			if (_.isEmpty(appContext.patientPetData)) {
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
