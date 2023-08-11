import moment from "moment"
import { addPatientLanguages } from "./save-patient-account-details"
import { addDoctorLanguages, addSpecialties } from "./save-doctor-account-details"

export const handleAddLanguage = async (
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

export const handleAddSpecialty = async (
  selectedSpecialtyID: number,
  doctorSpecialties: SpecialtyItem[],
  setDoctorSpecialties: React.Dispatch<React.SetStateAction<SpecialtyItem[]>>,
  setSelectedOrganization: React.Dispatch<React.SetStateAction<string>>,
  listDetails: DoctorListDetails,
  setSpecialtiesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> => {
  const selectedSpecialty = listDetails.specialties.find((spec) => spec.specialties_listID === selectedSpecialtyID)
  if (selectedSpecialty) {
    const newDoctorSpecialties = [...doctorSpecialties, selectedSpecialty]
    await addSpecialties(
      selectedSpecialtyID,
      newDoctorSpecialties,
      setDoctorSpecialties,
      setSelectedOrganization,
      setSpecialtiesConfirmation
    )
  }
}

export const handleAddEducation = (
  selectedSchool: string,
  setSelectedSchool: React.Dispatch<React.SetStateAction<string>>,
  selectedEducationType: string,
  setSelectedEducationType: React.Dispatch<React.SetStateAction<string>>,
  timeState: TimeState,
  setTimeState: React.Dispatch<React.SetStateAction<TimeState>>,
  selectedMajor: string | null = null,
  setSelectedMajor: React.Dispatch<React.SetStateAction<string>> | null = null
): GeneralEducationItem => {
  const selectedEducationObj: GeneralEducationItem = {
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


export const handleAddAccordion = (
  addresses: DoctorAddressData[],
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>
): void => {
  let maxPriority = Math.max(...addresses.map(address => address.address_priority))
  if (maxPriority === -Infinity) maxPriority = 0
  setAddresses(
    [...addresses,
      {
        address_priority: maxPriority + 1,
        addressesID: -1,
        address_title: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        Phone: "",
        address_public_status: true,
        instant_book: false,
        times:[]
      }
    ]
  )
}
