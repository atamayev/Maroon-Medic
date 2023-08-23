import PrivatePatientDataService from "src/services/private-patient-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default async function fetchPatientPersonalInfo (
  setHeaderData: React.Dispatch<React.SetStateAction<string>>
): Promise<void> {
  let response
  try {
    response = await PrivatePatientDataService.fillPersonalData()
  } catch (error: unknown) {
    handle401AxiosError(error)
  }

  if (response) {
    setHeaderData(response.data.FirstName)
    sessionStorage.setItem("PatientPersonalInfo", JSON.stringify(response.data))
  }
}
