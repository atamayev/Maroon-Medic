import { useEffect, useState } from "react"
import fetchPetData from "src/helper-functions/patient/my-pets/fetch-pet-data"

export default function useFetchAndSetPetData(userType: DoctorOrPatientOrNull): { savedPetData: SavedPetItem[] } {
	const storedData = sessionStorage.getItem("PatientPetData")
	const parsedData = storedData && JSON.parse(storedData)
	const [savedPetData, setSavedPetData] = useState<SavedPetItem[]>(parsedData || [])

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
