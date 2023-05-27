import { checkIfListsAreEqual, areArraysSame, convertDateForSql} from "../lists-and-object-checks";
import PrivateDoctorDataService from "../../Services/private-doctor-data-service";

export async function saveInsurances(acceptedInsurances, setInsurancesConfirmation){
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
    setInsurancesConfirmation({messageType: 'same'});
  }

  if(shouldSave){//only saves if the insurances changed
    try {
      const response = await PrivateDoctorDataService.saveGeneralData(insuranceIds, 'Insurance')
      if(response.status === 200){
        DoctorAccountDetails[0] = acceptedInsurances;
        sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
        setInsurancesConfirmation({messageType: 'saved'});
      }
    } catch(error) {
      setInsurancesConfirmation({messageType: 'problem'});
      console.log('error in saving Insurances', error)
    }
  }else{
    setInsurancesConfirmation({messageType: 'same'});
  }
};

export async function saveLanguages(spokenLanguages, setLanguagesConfirmation){
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
    setLanguagesConfirmation({messageType: 'same'});
  }

  if(shouldSave){//checks if they are the same
    try {
      const response = await PrivateDoctorDataService.saveGeneralData(languageIds, 'Language')
      if(response.status === 200){
        DoctorAccountDetails[1] = spokenLanguages;
        sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
        setLanguagesConfirmation({messageType: 'saved'});
      }
    } catch(error) {
      setLanguagesConfirmation({messageType: 'problem'});
      console.log('error in saving languages', error)
    }
  }else{
    setLanguagesConfirmation({messageType: 'same'});
  }
};

export async function saveServices(providedServices, setServicesConfirmation){
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  const savedServices = DoctorAccountDetails?.[2] || [];
  const createServiceKey = (service) => `${service.service_and_category_listID}-${service.Service_price}-${service.Service_time}`;

  const savedServiceKeys = savedServices.map(service => createServiceKey(service)).sort();
  const serviceKeys = providedServices.map(service => createServiceKey(service)).sort();
  
  let shouldSave = false;

  if(!savedServiceKeys.length || !savedServiceKeys){
    shouldSave = !!serviceKeys.length
  }else if((!checkIfListsAreEqual(savedServiceKeys, serviceKeys))){
    shouldSave = true;
  }else{
    setServicesConfirmation({messageType: 'same'});
  }
  const updatedServices = providedServices.map(service => {
    const { Service_name, Category_name, ...rest } = service;
    return rest;
  });//Only sends back the IDs, time, and price (cuts out unnecessary Service_name and category_name)

  if(shouldSave){//only saves if the insurances changed
    try {
      const response = await PrivateDoctorDataService.saveServiceData(updatedServices)//Make sure it's accepted services and not something else
      if(response.status === 200){
        DoctorAccountDetails[2] = providedServices;
        sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
        setServicesConfirmation({messageType: 'saved'});
      }
    } catch(error) {
      setServicesConfirmation({messageType: 'problem'});
      console.log('error in saving Services', error)
    }
  }else{
    setServicesConfirmation({messageType: 'same'});
  }
};

export async function saveSpecialies(doctorSpecialties, setSpecialtiesConfirmation){
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
    setSpecialtiesConfirmation({messageType: 'same'});
  }

  if(shouldSave){//checks if they are the same
    try {
      const response = await PrivateDoctorDataService.saveGeneralData(specialtyIds, 'Specialty')
      if(response.status === 200){
        DoctorAccountDetails[3] = doctorSpecialties;
        sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
        setSpecialtiesConfirmation({messageType: 'saved'});
      }
    } catch(error) {
      setSpecialtiesConfirmation({messageType: 'problem'});
      console.log('error in saving specialites', error)
    }
  }else{
    setSpecialtiesConfirmation({messageType: 'same'});
  }
};

export async function savePreVetSchool(preVetEducation, listDetails, setPreVetEducationConfirmation){
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
    setPreVetEducationConfirmation({messageType: 'same'});
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
        setPreVetEducationConfirmation({messageType: 'saved'});
      }
    } catch(error) {
      setPreVetEducationConfirmation({messageType: 'problem'});
      console.log('error in saving PreVets', error)
    }
  }else{
    setPreVetEducationConfirmation({messageType: 'same'});
  }
};

export async function saveVetSchool(vetEducation, listDetails, setVetEducationConfirmation){
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
    setVetEducationConfirmation({messageType: 'same'});
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
        setVetEducationConfirmation({messageType: 'saved'});
      }
    } catch(error) {
      setVetEducationConfirmation({messageType: 'problem'});
      console.log('error in saving education', error)
    }
  }else{
    setVetEducationConfirmation({messageType: 'same'});
  }
};

export async function saveLocation (addresses, setAddresses, setAddressesConfirmation){
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  const savedLocationData = DoctorAccountDetails?.[6];

  const savedTimes = savedLocationData.map(location => location.times);
  const savedAddresses = savedLocationData.map(({ times, ...rest }) => rest);
  const newTimes = addresses.map(location => location.times);
  const newAddresses = addresses.map(({ times, ...rest }) => rest);
  let shouldSave = false;

  if (!savedLocationData || !savedLocationData.length) {
    // If no Location Data exists
    shouldSave = !!addresses.length;
 } else if ((!areArraysSame(newAddresses, savedAddresses)) || (!areArraysSame(newTimes, savedTimes))) {
    // Data is different
    shouldSave = true;
  } else {
    // Data is the same
    setAddressesConfirmation({messageType: 'same'});
  }

  if (shouldSave) {
    try {
      const response = await PrivateDoctorDataService.saveAddressData(newAddresses, newTimes);
      if (response.status === 200) {
        const newAddressData = response.data;
        for (let i = 0; i < newAddressData.length; i++) {
          newAddressData[i]['times'] = newTimes[i];
        }
        DoctorAccountDetails[6] = newAddressData;
        setAddresses(newAddressData);
        sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
        setAddressesConfirmation({messageType: 'saved'});
      }
    } catch (error) {
      setAddressesConfirmation({messageType: 'problem'});
      console.log('error in saveLocation', error);
    }
  }else{
    setAddressesConfirmation({messageType: 'same'});
  }
};

export async function saveDescription(description, setDescriptionConfirmation){
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  const savedDescriptionData = DoctorAccountDetails[7].Description;
  let shouldSave = false;

  if (!savedDescriptionData || !savedDescriptionData.length) {
    // If no Location Data exists, sets 
    shouldSave = !!description.Description.length;
  } else if (description.Description !== savedDescriptionData) {
    // Data is different
    shouldSave = true;
  }else{
    setDescriptionConfirmation({messageType: 'same'});
  }

  if(shouldSave){//makes sure that it's only pushing to DB if description changed
    try {
      const response = await PrivateDoctorDataService.saveDescriptionData(description);
      if(response.status === 200){
        DoctorAccountDetails[7] = description;
        sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
        setDescriptionConfirmation({messageType: 'saved'});
      }
    } catch(error) {
      setDescriptionConfirmation({messageType: 'problem'});
      console.log('error in saveDescription', error)
    }
  }else{
    setDescriptionConfirmation({messageType: 'same'});
  }
};

export async function handlePublicAvailibilityToggle (value, setPubliclyAvailable, setPubliclyAvailableConfirmation) {
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  try{
    const response = await PrivateDoctorDataService.savePublicAvailibility(value);
    if(response.status === 200){
      setPubliclyAvailable(value);
      DoctorAccountDetails[9][0].PubliclyAvailable = value;
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
      setPubliclyAvailableConfirmation({messageType: 'saved'});
    }
  }catch(error){
    setPubliclyAvailableConfirmation({messageType: 'problem'});
    console.log('error in handlePublicAvailibilityToggle', error)
  }
};
