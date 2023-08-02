import PrivatePatientDataService from "../../services/private-patient-data-service"
import { handle401AxiosErrorAndSetError } from "src/utils/handle-errors"

async function modifyPatientLanguages(
  operation,
  languageID: number,
  newSpokenLanguages: LanguageItemType[],
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItemType[]>>,
  setLanguagesConfirmation
) {
  let response
  try {
    response = await operation(languageID)
  } catch (error: unknown) {
    handle401AxiosErrorAndSetError(error, setLanguagesConfirmation)
    return
  }
  if (response.status === 200) {
    setSpokenLanguages(newSpokenLanguages)
    const PatientAccountDetails = JSON.parse(sessionStorage.getItem("PatientAccountDetails"))
    PatientAccountDetails.languages = newSpokenLanguages
    sessionStorage.setItem("PatientAccountDetails", JSON.stringify(PatientAccountDetails))
    setLanguagesConfirmation({messageType: "saved"})
  } else {
    setLanguagesConfirmation({messageType: "problem"})
  }
}

export async function addPatientLanguages(
  languageID: number,
  newSpokenLanguages: LanguageItemType[],
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItemType[]>>,
  setLanguagesConfirmation
) {
  return modifyPatientLanguages(
    PrivatePatientDataService.addLanguage, languageID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation
  )
}

export async function deletePatientLanguages(
  languageID: number,
  newSpokenLanguages: LanguageItemType[],
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItemType[]>>,
  setLanguagesConfirmation
) {
  return modifyPatientLanguages(
    PrivatePatientDataService.deleteLanguage, languageID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation
  )
}
