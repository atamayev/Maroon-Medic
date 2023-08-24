import { useEffect, useState } from "react"
import fetchAndSetPetData from "src/helper-functions/patient/my-pets/fetch-and-set-pet-data"

export function useFetchPetData(userType: DoctorOrPatientOrNull): {
  savedPetData: SavedPetItem[]
  setSavedPetData: React.Dispatch<React.SetStateAction<SavedPetItem[]>>
  petTypes: ServicedPetItem[]
  insurances: InsuranceItem[]
} {
	const storedData = sessionStorage.getItem("PatientPetData")
	const parsedData = storedData && JSON.parse(storedData)
	const [savedPetData, setSavedPetData] = useState<SavedPetItem[]>(parsedData || [])
	const [petTypes, setPetTypes] = useState<ServicedPetItem[]>([])
	const [insurances, setInsurances] = useState<InsuranceItem[]>([])

	useEffect(() => {
		if (userType !== "Patient") return
		fetchAndSetPetData(setSavedPetData, setPetTypes, setInsurances)
	}, [userType])

	return { savedPetData, setSavedPetData, petTypes, insurances }
}

export default useFetchPetData
