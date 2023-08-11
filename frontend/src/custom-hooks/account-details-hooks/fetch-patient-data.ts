import ListsDataService from "../../services/lists-data-service"
import PrivatePatientDataService from "../../services/private-patient-data-service"
import { handle401AxiosError } from "src/utils/handle-errors"

export async function FillLists(
  setListDetails: React.Dispatch<React.SetStateAction<PatientListDetails>>
): Promise<void> {
  try {
    const response = await ListsDataService.fillPatientLists()
    setListDetails(response.data)
    sessionStorage.setItem("ListDetails", JSON.stringify(response.data))
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}

export async function FillPatientAccountDetails(
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>
): Promise<void> {
  try {
    const response = await PrivatePatientDataService.fillAccountDetails()
    if (response.data.languages) setSpokenLanguages(response.data.languages)
    sessionStorage.setItem("PatientAccountDetails", JSON.stringify(response.data))
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}
