import PrivatePatientDataService from "../../services/private-patient-data-service"
import { handle401AxiosErrorAndSetMessageType } from "src/utils/handle-errors"

type LanguageOperationsType = typeof PrivatePatientDataService.deleteLanguage |
                              typeof PrivatePatientDataService.addLanguage

async function modifyPatientLanguages(
  operation: LanguageOperationsType,
  languageID: number,
  newSpokenLanguages: LanguageItem[],
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
  setLanguagesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
  let response
  try {
    response = await operation(languageID)
  } catch (error: unknown) {
    handle401AxiosErrorAndSetMessageType(error, setLanguagesConfirmation)
    return
  }
  if (response.status === 200) {
    setSpokenLanguages(newSpokenLanguages)
    const PatientAccountDetails = JSON.parse(sessionStorage.getItem("PatientAccountDetails") ?? "{}")
    PatientAccountDetails.languages = newSpokenLanguages
    sessionStorage.setItem("PatientAccountDetails", JSON.stringify(PatientAccountDetails))
    setLanguagesConfirmation({messageType: "saved"})
  } else {
    setLanguagesConfirmation({messageType: "problem"})
  }
}

export async function addPatientLanguages(
  languageID: number,
  newSpokenLanguages: LanguageItem[],
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
  setLanguagesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
  return await modifyPatientLanguages(
    PrivatePatientDataService.addLanguage, languageID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation
  )
}

export async function deletePatientLanguages(
  languageID: number,
  newSpokenLanguages: LanguageItem[],
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
  setLanguagesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
  return await modifyPatientLanguages(
    PrivatePatientDataService.deleteLanguage, languageID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation
  )
}
