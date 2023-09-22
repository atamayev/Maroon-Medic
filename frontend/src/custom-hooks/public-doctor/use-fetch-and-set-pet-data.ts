import { useContext, useEffect, useState } from "react"
import { AppContext } from "src/contexts/maroon-context"
import fetchPetData from "src/helper-functions/patient/my-pets/fetch-pet-data"
import retrieveFromSessionStorage from "src/utils/retrieve-from-session-storage"

export default function useFetchAndSetPetData(): { savedPetData: SavedPetItem[] } {
	const patientPetData = retrieveFromSessionStorage("PatientPetData")
	const { userType } = useContext(AppContext)
	const [savedPetData, setSavedPetData] = useState<SavedPetItem[]>(patientPetData || [])

	useEffect(() => {
		const fetchAndSetPetData: () => void = async () => {
			try {
				if (userType !== "Patient") return

				const storedPetData = sessionStorage.getItem("PatientPetData")
				if (storedPetData) setSavedPetData(JSON.parse(storedPetData))
				else await fetchPetData(setSavedPetData)
			} catch (error) {
			}
		}

		fetchAndSetPetData()
	}, [])

	return { savedPetData }
}
