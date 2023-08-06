import ListsDataService from "../../services/lists-data-service"
import PrivatePatientDataService from "../../services/private-patient-data-service"
import { handle401AxiosError } from "src/utils/handle-errors"

export async function fetchPetData(
  setSavedPetData: React.Dispatch<React.SetStateAction<PetItemTypeWithID[]>>
): Promise<void> {
  try {
    const response = await PrivatePatientDataService.fetchPetData()
    if (response) {
      setSavedPetData(response.data)
      sessionStorage.setItem("PatientPetData", JSON.stringify(response.data))
    }
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}

export async function FillPetTypes(
  setPetTypes: React.Dispatch<React.SetStateAction<ServicedPetItemType[]>>
): Promise<void> {
  try {
    const response = await ListsDataService.fillPetTypes()
    if (response) {
      setPetTypes(response.data)
      sessionStorage.setItem("PetTypes", JSON.stringify(response.data))
    }
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}

export async function FillInsurances(
  setInsurances: React.Dispatch<React.SetStateAction<InsuranceItemType[]>>
): Promise<void> {
  try {
    const response = await ListsDataService.fillInsurances()
    if (response) {
      setInsurances(response.data)
      sessionStorage.setItem("Insurances", JSON.stringify(response.data))
    }
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}
