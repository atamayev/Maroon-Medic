import moment from "moment"
import { addPatientLanguages } from "./save-patient-account-details"
import { addDoctorLanguages, addSpecialties } from "./save-doctor-account-details"

export const handleAddLanguage = (
  selectedLanguageID: number,
  spokenLanguages: LanguageItemType[],
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItemType[]>>,
  listDetails,
  setLanguagesConfirmation,
  doctorOrPatient: "doctor" | "patient"
) => {
  const selectedLanguage = listDetails.languages.find((lang) => lang.language_listID === JSON.parse(selectedLanguageID))

  const newSpokenLanguages = [...spokenLanguages, selectedLanguage]

  if (doctorOrPatient === "doctor") {
    addDoctorLanguages(selectedLanguageID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation)
  }
  else if (doctorOrPatient === "patient") {
    addPatientLanguages(selectedLanguageID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation)
  }
}

export const handleAddSpecialty = (
  selectedSpecialtyID: number,
  doctorSpecialties,
  setDoctorSpecialties,
  setSelectedOrganization,
  listDetails,
  setSpecialtiesConfirmation
) => {
  const selectedSpecialty = listDetails.specialties.find((spec) => spec.specialties_listID === JSON.parse(selectedSpecialtyID))
  const newDoctorSpecialties = [...doctorSpecialties, selectedSpecialty]
  addSpecialties(selectedSpecialtyID, newDoctorSpecialties, setDoctorSpecialties, setSelectedOrganization, setSpecialtiesConfirmation)
}

export const handleAddEducation = (
  selectedSchool,
  setSelectedSchool,
  selectedEducationType,
  setSelectedEducationType,
  timeState,
  setTimeState,
  selectedMajor: string | null = null,
  setSelectedMajor: string | null = null
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
  setAddresses(
    [...addresses,
      {
        address_priority: maxPriority + 1,
        addressesID: 0,
        address_title: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        phone: "",
        address_public_status: 1,
        instant_book: 0,
        times:[]
      }
    ]
  )
}
