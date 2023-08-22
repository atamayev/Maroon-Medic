import { addDoctorLanguages } from "src/custom-hooks/account-details-hooks/save-doctor-account-details"
import { addPatientLanguages } from "src/custom-hooks/account-details-hooks/save-patient-account-details"

export const addLanguage = async (
  selectedLanguageID: number,
  spokenLanguages: LanguageItem[],
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
  listDetails: DoctorListDetails | PatientListDetails,
  setLanguagesConfirmation: (conf: ConfirmationMessage) => void,
  doctorOrPatient: doctorOrpatient
): Promise<void> => {
  const selectedLanguage = listDetails.languages.find((lang) => lang.language_listID === selectedLanguageID)

  if (selectedLanguage) {
    const newSpokenLanguages = [...spokenLanguages, selectedLanguage]

    if (doctorOrPatient === "doctor") {
      await addDoctorLanguages(selectedLanguageID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation)
    }
    else {
      await addPatientLanguages(selectedLanguageID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation)
    }
  }
}

export default addLanguage
