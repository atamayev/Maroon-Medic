import { saveDoctorLanguages, saveSpecialies } from "./DoctorAccountDetails/saveDoctorAccountDetails";
import { savePatientLanguages } from "./PatientAccountDetails/savePatientAccountDetails";

export const handleAddLanguage = (selectedLanguageID, spokenLanguages, setSpokenLanguages, listDetails, setLanguagesConfirmation, doctorOrPatient) => {
  const selectedLanguage = listDetails[1].find((lang) => lang.language_listID === JSON.parse(selectedLanguageID));
  const newSpokenLanguages = [...spokenLanguages, selectedLanguage];
  setSpokenLanguages(newSpokenLanguages);
  if (doctorOrPatient === 'doctor') saveDoctorLanguages(selectedLanguageID, newSpokenLanguages, setLanguagesConfirmation, 'add')
  else if (doctorOrPatient === 'patient') savePatientLanguages(selectedLanguageID, newSpokenLanguages, setLanguagesConfirmation, 'add')
  
};

export const handleAddSpecialty = (selectedSpecialtyID, doctorSpecialties, setDoctorSpecialties, setSelectedOrganization, listDetails, setSpecialtiesConfirmation) => {
  const selectedSpecialty = listDetails[2].find((spec) => spec.specialties_listID === JSON.parse(selectedSpecialtyID));
  const newDoctorSpecialties = [...doctorSpecialties, selectedSpecialty];
  setDoctorSpecialties(newDoctorSpecialties)
  saveSpecialies(selectedSpecialtyID, newDoctorSpecialties, setSelectedOrganization, setSpecialtiesConfirmation, 'add')
};

export const handleAddPreVetEducation = (
  selectedPreVetSchool, 
  selectedMajor, 
  selectedPreVetEducationType, 
  preVetEducation, 
  setPreVetEducation, 
  setSelectedPreVetSchool, 
  setSelectedMajor, 
  setSelectedPreVetEducationType,
  timeState, 
  setTimeState
  ) => {
  if(!timeState.startMonth){
    timeState.startMonth = 'January'
  }
  if(!timeState.endMonth){
    timeState.endMonth = 'January'
  }
  const selectedEducationObj = {
    School_name: selectedPreVetSchool, 
    Education_type:selectedPreVetEducationType,
    Major_name: selectedMajor,
    Start_Date: `${timeState.startYear}-${timeState.startMonth}-1`,
    End_Date: `${timeState.endYear}-${timeState.endMonth}-1`,
  }
  setPreVetEducation([...preVetEducation, selectedEducationObj]);

  const currentYear = new Date().getFullYear();
  setSelectedPreVetSchool('');
  setSelectedMajor('');
  setSelectedPreVetEducationType('');
  setTimeState({
    startMonth: 'January', 
    endMonth: 'January', 
    startYear: currentYear, 
    endYear: currentYear,
  });
  return selectedEducationObj
};

export const handleAddVetEducation = (
  selectedVetSchool, 
  setSelectedVetSchool, 
  selectedVetEducationType, 
  setSelectedVetEducationType,
  vetEducation, 
  setVetEducation, 
  timeState, 
  setTimeState
  ) => {
  if(!timeState.startMonth){
    timeState.startMonth = 'January'
  }
  if(!timeState.endMonth){
    timeState.endMonth = 'January'
  }
  const selectedEducationObj = {
    School_name: selectedVetSchool, 
    Education_type: selectedVetEducationType,
    Start_Date: `${timeState.startYear}-${timeState.startMonth}-1`,
    End_Date: `${timeState.endYear}-${timeState.endMonth}-1`,
  }
  setVetEducation([...vetEducation, selectedEducationObj]);
  
  const currentYear = new Date().getFullYear();
  setSelectedVetSchool('');
  setSelectedVetEducationType('');
  setTimeState({
    startMonth: 'January', 
    endMonth: 'January', 
    startYear: currentYear, 
    endYear: currentYear,
  });
  return selectedEducationObj
};

export const handleAddAccordion = (addresses, setAddresses) => {
  let maxPriority = Math.max(...addresses.map(address => address.address_priority));
  if (maxPriority === -Infinity) maxPriority = 0;
  setAddresses([...addresses, { address_priority: maxPriority+1, addressesID: 0, address_title: '', address_line_1: '', address_line_2: '', city: '', state: '', zip: '', country: '', phone_priority: 0, phone: '', address_public_status: 1, instant_book: 0, times:[]}]);
};
