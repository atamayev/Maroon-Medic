import PrivatePatientDataService from "../../services/private-patient-data-service"
import { invalidUserAction} from "../user-verification-snippets"

async function modifyPatientLanguages(operation, languageID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation) {
  let response
  try {
    response = await operation(languageID)
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setLanguagesConfirmation({messageType: "problem"})
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

export async function addPatientLanguages(languageID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation) {
  return modifyPatientLanguages(
    PrivatePatientDataService.addLanguage, languageID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation
  )
}

export async function deletePatientLanguages(languageID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation) {
  return modifyPatientLanguages(
    PrivatePatientDataService.deleteLanguage, languageID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation
  )
}
