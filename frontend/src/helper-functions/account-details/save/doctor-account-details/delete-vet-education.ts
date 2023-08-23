import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"

export default async function deleteVetEducation(
  vetEducationMappingID: number,
  vetEducation: VetEducationItem[],
  setVetEducation: React.Dispatch<React.SetStateAction<VetEducationItem[]>>,
  setVetEducationConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
  try {
    const response = await PrivateDoctorDataService.deleteVetEducationData(vetEducationMappingID)
    if (response.status === 200) {
      const newVetEducation = vetEducation.filter(object => object.vet_education_mappingID !== vetEducationMappingID)
      setVetEducation(newVetEducation)
      const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") || "{}")
      DoctorAccountDetails.vetEducation = newVetEducation
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
      setVetEducationConfirmation({ messageType: "saved" })
    } else {
      setVetEducationConfirmation({messageType: "problem"})
      return
    }
  } catch (error: unknown) {
    handle401AxiosErrorAndSetMessageType(error, setVetEducationConfirmation)
  }
}
