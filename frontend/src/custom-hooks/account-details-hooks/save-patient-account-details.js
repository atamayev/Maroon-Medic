import PrivatePatientDataService from "../../services/private-patient-data-service"
import { invalidUserAction} from "../user-verification-snippets"

export async function addPatientLanguages(languageID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation) {
  const PatientAccountDetails = JSON.parse(sessionStorage.getItem("PatientAccountDetails"))
  let response
  try {
    response = await PrivatePatientDataService.addLanguage(languageID)
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setLanguagesConfirmation({messageType: "problem"})
    return
  }
  if (response.status === 200) {
    setSpokenLanguages(newSpokenLanguages)
    PatientAccountDetails.languages = newSpokenLanguages
    sessionStorage.setItem("PatientAccountDetails", JSON.stringify(PatientAccountDetails))
    setLanguagesConfirmation({messageType: "saved"})
  } else {
    setLanguagesConfirmation({messageType: "problem"})
  }
}

export async function deletePatientLanguages(languageID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation) {
  const PatientAccountDetails = JSON.parse(sessionStorage.getItem("PatientAccountDetails"))
  let response
  try {
    response = await PrivatePatientDataService.deleteLanguage(languageID)
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setLanguagesConfirmation({messageType: "problem"})
    return
  }
  if (response.status === 200) {
    setSpokenLanguages(newSpokenLanguages)
    PatientAccountDetails.languages = newSpokenLanguages
    sessionStorage.setItem("PatientAccountDetails", JSON.stringify(PatientAccountDetails))
    setLanguagesConfirmation({messageType: "saved"})
  } else {
    setLanguagesConfirmation({messageType: "problem"})
  }
}
