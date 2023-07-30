import { AxiosError } from "axios"
import ListsDataService from "../../services/lists-data-service"
import { invalidUserAction } from "../user-verification-snippets"
import PrivatePatientDataService from "../../services/private-patient-data-service"

export async function fetchPetData(setSavedPetData) {
  try {
    const response = await PrivatePatientDataService.fetchPetData()
    if (response) {
      setSavedPetData(response.data)
      sessionStorage.setItem("PatientPetData", JSON.stringify(response.data))
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        invalidUserAction(error.response.data)
      }
    }
  }
}

export async function FillPetTypes(setPetTypes) {
  try {
    const response = await ListsDataService.fillPetTypes()
    if (response) {
      setPetTypes(response.data)
      sessionStorage.setItem("PetTypes", JSON.stringify(response.data))
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        invalidUserAction(error.response.data)
      }
    }
  }
}

export async function FillInsurances(setInsurances) {
  try {
    const response = await ListsDataService.fillInsurances()
    if (response) {
      setInsurances(response.data)
      sessionStorage.setItem("Insurances", JSON.stringify(response.data))
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        invalidUserAction(error.response.data)
      }
    }
  }
}
