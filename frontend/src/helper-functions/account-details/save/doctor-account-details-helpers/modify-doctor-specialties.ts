import PrivateDoctorDataService from "../../../../services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"

type SpecialtyOperationsType = typeof PrivateDoctorDataService.deleteSpecialty |
                               typeof PrivateDoctorDataService.addSpecialty

export default async function modifyDoctorSpecialties(
  operation: SpecialtyOperationsType,
  specialtyID: number,
  newDoctorSpecialties: SpecialtyItem[],
  setDoctorSpecialties: React.Dispatch<React.SetStateAction<SpecialtyItem[]>>,
  setSpecialtiesConfirmation: (conf: ConfirmationMessage) => void,
  callback: () => void
): Promise<void> {
  let response
  try {
    response = await operation(specialtyID)
  } catch (error: unknown) {
    handle401AxiosErrorAndSetMessageType(error, setSpecialtiesConfirmation)
    return
  }
  if (response.status === 200) {
    setDoctorSpecialties(newDoctorSpecialties)
    const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") ?? "{}")
    DoctorAccountDetails.specialties = newDoctorSpecialties
    sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
    setSpecialtiesConfirmation({messageType: "saved"})
  } else {
    setSpecialtiesConfirmation({messageType: "problem"})
    return
  }
  callback()
}
