import PrivatePatientDataService from "src/services/private-patient-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default async function fetchPatientAccountDetails(
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
