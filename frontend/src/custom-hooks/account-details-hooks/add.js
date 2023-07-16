import moment from "moment"
import { savePatientLanguages } from "./save-patient-account-details"
import { addDoctorLanguages, saveSpecialies } from "./save-doctor-account-details"

export const handleAddLanguage = (selectedLanguageID, spokenLanguages, setSpokenLanguages, listDetails, setLanguagesConfirmation, doctorOrPatient) => {
  let selectedLanguage
  if (doctorOrPatient === "doctor") selectedLanguage = listDetails.languages.find((lang) => lang.language_listID === JSON.parse(selectedLanguageID))
  else if (doctorOrPatient === "patient") selectedLanguage = listDetails.languages.find((lang) => lang.language_listID === JSON.parse(selectedLanguageID))

  const newSpokenLanguages = [...spokenLanguages, selectedLanguage]

  if (doctorOrPatient === "doctor") addDoctorLanguages(selectedLanguageID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation)
  else if (doctorOrPatient === "patient") savePatientLanguages(selectedLanguageID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation, "add")
}

export const handleAddSpecialty = (selectedSpecialtyID, doctorSpecialties, setDoctorSpecialties, setSelectedOrganization, listDetails, setSpecialtiesConfirmation) => {
  const selectedSpecialty = listDetails.specialties.find((spec) => spec.specialties_listID === JSON.parse(selectedSpecialtyID))
  const newDoctorSpecialties = [...doctorSpecialties, selectedSpecialty]
  saveSpecialies(selectedSpecialtyID, newDoctorSpecialties, setDoctorSpecialties, setSelectedOrganization, setSpecialtiesConfirmation, "add")
}

export const handleAddEducation = (
  selectedSchool,
  setSelectedSchool,
  selectedEducationType,
  setSelectedEducationType,
  timeState,
  setTimeState,
  selectedMajor = null,
  setSelectedMajor = null
) => {
  const selectedEducationObj = {
    School_name: selectedSchool,
    Education_type: selectedEducationType,
    Start_Date: moment(`${timeState.startYear}-${timeState.startMonth}-1`,"YYYY-MMMM-D").format("MMMM D, YYYY"),
    End_Date: moment(`${timeState.endYear}-${timeState.endMonth}-1`,"YYYY-MMMM-D").format("MMMM D, YYYY"),
  }
  if (selectedMajor) selectedEducationObj.Major_name = selectedMajor

  setSelectedSchool("")
  setSelectedEducationType("")
  setTimeState({
    startMonth: "",
    endMonth: "",
    startYear: "",
    endYear: "",
  })

  if (setSelectedMajor) setSelectedMajor("")

  return selectedEducationObj
}


export const handleAddAccordion = (addresses, setAddresses) => {
  let maxPriority = Math.max(...addresses.map(address => address.address_priority))
  if (maxPriority === -Infinity) maxPriority = 0
  setAddresses([...addresses, { address_priority: maxPriority + 1, addressesID: 0, address_title: "", address_line_1: "", address_line_2: "", city: "", state: "", zip: "", country: "", phone_priority: 0, phone: "", address_public_status: 1, instant_book: 0, times:[]}])
}
