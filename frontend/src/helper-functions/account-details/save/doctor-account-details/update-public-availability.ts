import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"

export default async function updatePublicAvailability (
  value: boolean,
  setPubliclyAvailable: React.Dispatch<React.SetStateAction<boolean>>,
  setPubliclyAvailableConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") || "{}")
  try {
    const response = await PrivateDoctorDataService.savePublicAvailibility(value)
    if (response.status === 200) {
      setPubliclyAvailable(value)
      DoctorAccountDetails.publiclyAvailable = value
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
      setPubliclyAvailableConfirmation({messageType: "saved"})
    }
  } catch (error: unknown) {
    handle401AxiosErrorAndSetMessageType(error, setPubliclyAvailableConfirmation)
  }
}
