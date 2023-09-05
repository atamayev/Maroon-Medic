import { useEffect, useState } from "react"
import fetchPetData from "src/helper-functions/patient/my-pets/fetch-pet-data"
import retrieveFromSessionStorage from "src/utils/retrieve-from-session-storage"

export default function useFetchAndSetPetData(userType: DoctorOrPatientOrNull): { savedPetData: SavedPetItem[] } {
	const patientPetData = retrieveFromSessionStorage("PatientPetData")
	const [savedPetData, setSavedPetData] = useState<SavedPetItem[]>(patientPetData || [])

	useEffect(() => {
		const fetchAndSetPetData: () => void = async () => {
			if (userType === "Patient") {
				try {
					const storedPetData = sessionStorage.getItem("PatientPetData")
					if (storedPetData) setSavedPetData(JSON.parse(storedPetData))
					else await fetchPetData(setSavedPetData)
				} catch (error) {
				}
			}
		}

		fetchAndSetPetData()
	}, [userType])

	return { savedPetData }
}