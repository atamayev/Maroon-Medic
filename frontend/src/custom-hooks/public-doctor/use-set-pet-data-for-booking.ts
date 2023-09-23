import _ from "lodash"
import { useContext, useEffect } from "react"
import { AppContext } from "src/contexts/maroon-context"
import useFetchPetData from "src/custom-hooks/my-pets/use-fetch-pet-data"

export default function useSetPetDataForBooking(): void {
	const appContext = useContext(AppContext)
	const fetchPetData = useFetchPetData()

	const fetchAndSetPetData: () => void = async () => {
		try {
			if (_.isEmpty(appContext.patientPetData)) {
				await fetchPetData()
			}
		} catch (error) {
		}
	}

	useEffect(() => {
		if (appContext.userType !== "Patient") return
		fetchAndSetPetData()
	}, [appContext.userType])
}
