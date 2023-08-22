import { AxiosResponse } from "axios"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import PrivatePatientDataService from "src/services/private-patient-data-service"

export const savePersonalInfo = async (
  personalInfo: BirthDateInfo,
  setPersonalInfoConfirmation: (conf: ConfirmationMessage) => void,
  userType: DoctorOrPatient
): Promise<void> => {
  const storedPersonalInfoData = sessionStorage.getItem(`${userType}PersonalInfo`)
  const stringifiedPersonalInfoData = JSON.stringify(personalInfo)

  try {
    if (stringifiedPersonalInfoData !== storedPersonalInfoData) {
      let response: AxiosResponse
      if (userType === "Doctor") response = await PrivateDoctorDataService.savePersonalData(personalInfo)
      else response = await PrivatePatientDataService.savePersonalData(personalInfo)

      if (response.status === 200) {
        sessionStorage.setItem(`${userType}PersonalInfo`, JSON.stringify(personalInfo))
        setPersonalInfoConfirmation({messageType: "saved"})
      }
    } else {
      setPersonalInfoConfirmation({messageType: "same"})
    }
  } catch (error) {
    setPersonalInfoConfirmation({messageType: "problem"})
  }
}

export default savePersonalInfo
