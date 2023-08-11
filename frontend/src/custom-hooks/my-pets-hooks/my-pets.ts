import { useEffect, useState } from "react"
import ListsDataService from "../../services/lists-data-service"
import PrivatePatientDataService from "../../services/private-patient-data-service"
import { handle401AxiosError } from "src/utils/handle-errors"

export async function fetchPetData(
  setSavedPetData: React.Dispatch<React.SetStateAction<SavedPetItem[]>>
): Promise<void> {
  try {
    const response = await PrivatePatientDataService.fetchPetData()
    setSavedPetData(response.data)
    sessionStorage.setItem("PatientPetData", JSON.stringify(response.data))
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}

async function FillPetTypes(
  setPetTypes: React.Dispatch<React.SetStateAction<ServicedPetItem[]>>
): Promise<void> {
  try {
    const response = await ListsDataService.fillPetTypes()
    setPetTypes(response.data)
    sessionStorage.setItem("PetTypes", JSON.stringify(response.data))
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}

async function FillInsurances(
  setInsurances: React.Dispatch<React.SetStateAction<InsuranceItem[]>>
): Promise<void> {
  try {
    const response = await ListsDataService.fillInsurances()
    setInsurances(response.data)
    sessionStorage.setItem("Insurances", JSON.stringify(response.data))
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}

export function usePetData(userType: DoctorOrPatientOrNull): {
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

  const fetchAndSetPetData = async () => {
    try {
      const storedPetData = sessionStorage.getItem("PatientPetData")
      if (storedPetData) setSavedPetData(JSON.parse(storedPetData))
      else await fetchPetData(setSavedPetData)

      const storedPetTypes = sessionStorage.getItem("PetTypes")
      if (storedPetTypes) setPetTypes(JSON.parse(storedPetTypes))
      else await FillPetTypes(setPetTypes)

      const storedInsurances = sessionStorage.getItem("Insurances")
      if (storedInsurances) setInsurances(JSON.parse(storedInsurances))
      else await FillInsurances(setInsurances)
    } catch (error) {
    }
  }

  useEffect(() => {
    if (userType !== "Patient") return
    fetchAndSetPetData()
  }, [userType])

  return { savedPetData, setSavedPetData, petTypes, insurances }
}
