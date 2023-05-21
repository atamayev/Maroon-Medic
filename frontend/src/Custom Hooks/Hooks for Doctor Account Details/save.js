import { checkIfListsAreEqual, areArraysSame, arraysEqual, convertDateForSql} from "../lists-and-object-checks";
import PrivateDoctorDataService from "../../Services/private-doctor-data-service";

export async function saveInsurances(acceptedInsurances, setShowSavedInsurancesMessage, setShowSameInsurancesMessage, setShowSaveInsurancesProblemMessage){
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  const savedInsurances = DoctorAccountDetails?.[0] || [];
  const savedInsurancesIDs = savedInsurances.map(insurance => insurance.insurance_listID).sort((a,b)=>a-b);
  const insuranceIds = acceptedInsurances.map(ins => ins.insurance_listID).sort((a,b)=>a-b); // list of all added insurances
  
  let shouldSave = false;

  if(!savedInsurancesIDs.length || !savedInsurancesIDs){
    shouldSave = !!insuranceIds.length
  }else if((!checkIfListsAreEqual(insuranceIds, savedInsurancesIDs))){
    shouldSave = true;
  }else{
    setShowSameInsurancesMessage(true);
  }

  if(shouldSave){//only saves if the insurances changed
    try {
      const response = await PrivateDoctorDataService.saveGeneralData(insuranceIds, 'Insurance')
      if(response.status === 200){
        DoctorAccountDetails[0] = acceptedInsurances;
        sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
        setShowSavedInsurancesMessage(true);
      }
    } catch(error) {
      setShowSaveInsurancesProblemMessage(true);
      console.log('error in saving Insurances', error)
    }
  }else{
    setShowSameInsurancesMessage(true);
  }
};

export async function saveLanguages(spokenLanguages, setShowSavedLanguagesMessage, setShowSameLanguagesMessage, setShowSaveLanguagesProblemMessage){
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  const savedLanguages = DoctorAccountDetails?.[1] || []
  const savedLanguagesIDs = savedLanguages.map(language => language.language_listID).sort((a,b)=>a-b);
  const languageIds = spokenLanguages.map(lang => lang.language_listID).sort((a,b)=>a-b); // spoken languages are those that are on server side. state changes when languages added/deleted

  let shouldSave = false;
  if(!savedLanguagesIDs.length || !savedLanguagesIDs){
    shouldSave = !!languageIds.length
  }else if((!checkIfListsAreEqual(languageIds, savedLanguagesIDs))){
    shouldSave = true;
  }else{
    setShowSameLanguagesMessage(true);
  }

  if(shouldSave){//checks if they are the same
    try {
      const response = await PrivateDoctorDataService.saveGeneralData(languageIds, 'Language')
      if(response.status === 200){
        DoctorAccountDetails[1] = spokenLanguages;
        sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
        setShowSavedLanguagesMessage(true);
      }
    } catch(error) {
      setShowSaveLanguagesProblemMessage(true);
      console.log('error in saving languages', error)
    }
  }else{
    setShowSameLanguagesMessage(true);
  }
};

export async function saveServices(selectedServices, setShowSavedServicesMessage, setShowSameServicesMessage, setShowSaveServicesProblemMessage){
  //NON-FUNCTIONAL
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));

  //savedServices is an Array of Objects of currently saved Services
  const savedServices = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))?.[2] || []

  // Convert the array of objects to an array of arrays
  const convertedArray = savedServices.map(obj => [obj.service_and_category_listID, obj.Service_time, obj.Service_price]);

  //Creates an array of arrays from the entered Services data
  let servicesData = [];
  selectedServices.forEach(service => {
    let time = document.getElementById(`time-${service.service_and_category_listID}`)?.value;
    let price = document.getElementById(`price-${service.service_and_category_listID}`)?.value || null;
    if (!time) {
      alert('Please fill out the Service Time for all selected services.');
      return;
    }
    servicesData.push([service.service_and_category_listID, Number(time), price]);
  })

  // Sort and stringify arrays for comparison
  let sortedSavedServices = convertedArray.map(e => e.sort());
  let sortedServicesData = servicesData.map(e => e.sort());

  console.log('sortedSavedServices',sortedSavedServices)
  console.log('sortedServicesData',sortedServicesData)

  // Check if every element in the first array is included in the second array and vice versa
  if (!(sortedSavedServices.every(arr1 => sortedServicesData.some(arr2 => arraysEqual(arr1, arr2))) 
    && sortedServicesData.every(arr1 => sortedSavedServices.some(arr2 => arraysEqual(arr1, arr2))))) {
    console.log('different')
    console.log(sortedServicesData)
    try {
          const response = await PrivateDoctorDataService.saveServiceData(sortedServicesData)
          if(response.status === 200){
            DoctorAccountDetails[2] = selectedServices;
            sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
            console.log('Saved!');
            // Show the saved message
            setShowSavedServicesMessage(true);
          }
      }catch(error) {
        console.log('error in saving Services', error)
      }
  }else {
    console.log('same');
  }
};

export async function saveSpecialies(doctorSpecialties, setShowSavedSpecialtiesMessage, setShowSameSpecialtiesMessage, setShowSaveSpecialtiesProblemMessage){
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  const savedSpecialties = DoctorAccountDetails?.[3] || []
  const savedSpecialtyIDs = savedSpecialties.map(specialty => specialty.specialties_listID).sort((a,b)=>a-b);
  const specialtyIds = doctorSpecialties.map(specialty => specialty.specialties_listID).sort((a,b)=>a-b); // spoken languages are those that are on server side. state changes when languages added/deleted

  let shouldSave = false;
  if(!savedSpecialtyIDs.length || !savedSpecialtyIDs){
    shouldSave = !!specialtyIds.length
  }else if((!checkIfListsAreEqual(specialtyIds, savedSpecialtyIDs))){
    shouldSave = true;
  }else{
    setShowSameSpecialtiesMessage(true);
  }

  if(shouldSave){//checks if they are the same
    try {
      const response = await PrivateDoctorDataService.saveGeneralData(specialtyIds, 'Specialty')
      if(response.status === 200){
        DoctorAccountDetails[3] = doctorSpecialties;
        sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
        setShowSavedSpecialtiesMessage(true);
      }
    } catch(error) {
      setShowSaveSpecialtiesProblemMessage(true);
      console.log('error in saving specialites', error)
    }
  }else{
    setShowSameSpecialtiesMessage(true);
  }
};

export async function savePreVetSchool(preVetEducation, listDetails, setShowSavedPreVetEducationMessage, setShowSamePreVetEducationMessage, setShowSavePreVetEducationProblemMessage){
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  const savedPreVetEducations = DoctorAccountDetails?.[4] || []
  let shouldSave = false;

  if (!savedPreVetEducations || !savedPreVetEducations.length) {
    // If no Location Data exists
    shouldSave = !!preVetEducation.length;
  } else if (!areArraysSame(preVetEducation, savedPreVetEducations)) {
    // Data is different
    shouldSave = true;
  } else {
    // Data is the same
    setShowSamePreVetEducationMessage(true);
  }

  if(shouldSave){
    try {
      const mappedArray = preVetEducation.map(obj => [
        listDetails[4].find(school => school.School_name === obj.School_name)?.pre_vet_school_listID || null,
        listDetails[6].find(major => major.Major_name === obj.Major_name)?.major_listID || null,
        listDetails[5].find(educationType => educationType.Education_type === obj.Education_type)?.pre_vet_education_typeID || null,
        convertDateForSql(obj.Start_Date),
        convertDateForSql(obj.End_Date)
      ]);
      const response = await PrivateDoctorDataService.saveEducationData(mappedArray, 'pre_vet')
      if(response.status === 200){
        DoctorAccountDetails[4] = preVetEducation;
        sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
        setShowSavedPreVetEducationMessage(true);
      }
    } catch(error) {
      setShowSavePreVetEducationProblemMessage(true);
      console.log('error in saving PreVets', error)
    }
  }else{
    setShowSamePreVetEducationMessage(true);
  }
};

export async function saveVetSchool(vetEducation, listDetails, setShowSavedVetEducationMessage, setShowSameVetEducationMessage, setShowSaveVetEducationProblemMessage){
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  const savedVetEducations = DoctorAccountDetails?.[5] || []
  let shouldSave = false;

  if (!savedVetEducations || !savedVetEducations.length) {
    // If no Location Data exists
    shouldSave = !!vetEducation.length;
  } else if (!areArraysSame(vetEducation, savedVetEducations)) {
    // Data is different
    shouldSave = true;
  } else {
    // Data is the same
    setShowSameVetEducationMessage(true);
  }

  if(shouldSave){//only saves if the educations changed
    try {
      const mappedArray = vetEducation.map(obj => [
        listDetails[7].find(school => school.School_name === obj.School_name)?.vet_school_listID || null,
        listDetails[8].find(educationType => educationType.Education_Type === obj.Education_Type)?.vet_education_typeID || null,
        convertDateForSql(obj.Start_Date),
        convertDateForSql(obj.End_Date)
      ]);
      const response = await PrivateDoctorDataService.saveEducationData(mappedArray, 'vet')
      if(response.status === 200){
        DoctorAccountDetails[5] = vetEducation;
        sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
        setShowSavedVetEducationMessage(true);
      }
    } catch(error) {
      setShowSaveVetEducationProblemMessage(true);
      console.log('error in saving education', error)
    }
  }else{
    setShowSameVetEducationMessage(true);
  }
};

export async function saveLocation (addresses, setAddresses, setShowSavedLocationMessage, setShowSameLocationMessage, setShowSaveProblemMessage){
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  const savedLocationData = DoctorAccountDetails?.[6];
  let shouldSave = false;

  if (!savedLocationData || !savedLocationData.length) {
    // If no Location Data exists
    shouldSave = !!addresses.length;
  } else if (!areArraysSame(addresses, savedLocationData)) {
    // Data is different
    shouldSave = true;
  } else {
    // Data is the same
    setShowSameLocationMessage(true);
  }

  if (shouldSave) {
    try {
      const response = await PrivateDoctorDataService.saveAddressData(addresses);
      if (response.status === 200) {
        const newAddressData = response.data;
        DoctorAccountDetails[6] = newAddressData;
        setAddresses(newAddressData);
        sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
        setShowSavedLocationMessage(true);
      } else {
        console.log('problem saving data');
        setShowSaveProblemMessage(true);
      }
    } catch (error) {
      console.log('error in saveLocation', error);
      setShowSaveProblemMessage(true);
    }
  }else{
    setShowSameLocationMessage(true);
  }
};

export async function saveDescription(description, setShowSavedDescriptionMessage, setShowSameDescriptionMessage, setShowSaveDescriptionProblemMessage){
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  const savedDescriptionData = DoctorAccountDetails[7].Description;
  let shouldSave = false;

  if (!savedDescriptionData || !savedDescriptionData.length) {
    // If no Location Data exists, sets 
    shouldSave = !!description.Description.length;
  } else if (description.Description !== savedDescriptionData) {
    // Data is different
    shouldSave = true;
  }

  if(shouldSave){//makes sure that it's only pushing to DB if description changed
    try {
      const response = await PrivateDoctorDataService.saveDescriptionData(description);
      if(response.status === 200){
        DoctorAccountDetails[7] = description;
        sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
        setShowSavedDescriptionMessage(true);
      }
    } catch(error) {
      setShowSaveDescriptionProblemMessage(true);
      console.log('error in saveDescription', error)
    }
  }else{
    setShowSameDescriptionMessage(true);
  }
};

export async function handlePublicAvailibilityToggle (value, setPubliclyAvailable, setShowSavedPubliclyAvalableMessage, setShowSavePubliclyAvalableProblemMessage) {
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  try{
    const response = await PrivateDoctorDataService.savePublicAvailibility(value);
    if(response.status === 200){
      setPubliclyAvailable(value);
      DoctorAccountDetails[9][0].PubliclyAvailable = value;
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
      setShowSavedPubliclyAvalableMessage(true);
    }
  }catch(error){
    setShowSavePubliclyAvalableProblemMessage(true);
    console.log('error in handlePublicAvailibilityToggle', error)
  }
};
