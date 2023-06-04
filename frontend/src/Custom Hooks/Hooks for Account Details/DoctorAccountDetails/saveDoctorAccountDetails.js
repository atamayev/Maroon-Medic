import { checkIfListsAreEqual, areArraysSame, convertDateForSql} from "../../lists-and-object-checks";
import PrivateDoctorDataService from "../../../Services/private-doctor-data-service";

// export async function saveLanguages(spokenLanguages, setLanguagesConfirmation){
//   const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
//   const savedLanguages = DoctorAccountDetails?.[0] || []
//   const savedLanguagesIDs = savedLanguages.map(language => language.language_listID).sort((a,b)=>a-b);
//   const languageIds = spokenLanguages.map(lang => lang.language_listID).sort((a,b)=>a-b); // spoken languages are those that are on server side. state changes when languages added/deleted

//   let shouldSave = false;

//   if(!savedLanguagesIDs.length && !languageIds.length) {
//     // Case where both arrays are empty
//     setLanguagesConfirmation({messageType: 'none'});
//     return;
//   }

//   if(!savedLanguagesIDs.length || !savedLanguagesIDs){
//     shouldSave = !!languageIds.length
//   }else if((!checkIfListsAreEqual(languageIds, savedLanguagesIDs))){
//     shouldSave = true;
//   }else{
//     setLanguagesConfirmation({messageType: 'same'});
//   }

//   if(shouldSave){//checks if they are the same
//     try {
//       const response = await PrivateDoctorDataService.saveGeneralData(languageIds, 'Language')
//       if(response.status === 200){
//         DoctorAccountDetails[0] = spokenLanguages;
//         sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
//         setLanguagesConfirmation({messageType: 'saved'});
//       }
//     } catch(error) {
//       setLanguagesConfirmation({messageType: 'problem'});
//       console.log('error in saving languages', error)
//     }
//   }else{
//     setLanguagesConfirmation({messageType: 'same'});
//   }
// };

export async function saveLanguages(languageID, spokenLanguages, setLanguagesConfirmation, operationType){
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  console.log(languageID)
  return;
  let response;
  try{
    response = await PrivateDoctorDataService.saveGeneralData(languageID, 'Language', operationType)
  }catch(error){
    setLanguagesConfirmation({messageType: 'problem'});
    console.log('error in saving languages', error)
  }
  if(response.status === 200){
    DoctorAccountDetails[0] = spokenLanguages;
    sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
    setLanguagesConfirmation({messageType: 'saved'});
  }else{
    setLanguagesConfirmation({messageType: 'problem'});
    console.log('error in saving languages in else')
  }
};

export async function saveServices(providedServices, setServicesConfirmation){
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  const savedServices = DoctorAccountDetails?.[1] || [];
  const createServiceKey = (service) => `${service.service_and_category_listID}-${service.Service_price}-${service.Service_time}`;

  const savedServiceKeys = savedServices.map(service => createServiceKey(service)).sort();
  const serviceKeys = providedServices.map(service => createServiceKey(service)).sort();
  
  let shouldSave = false;

  if(!savedServiceKeys.length && !serviceKeys.length) {
    // Case where both arrays are empty
    setServicesConfirmation({messageType: 'none'});
    return;
  }

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
        DoctorAccountDetails[1] = providedServices;
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
  const savedSpecialties = DoctorAccountDetails?.[2] || []
  const savedSpecialtyIDs = savedSpecialties.map(specialty => specialty.specialties_listID).sort((a,b)=>a-b);
  const specialtyIds = doctorSpecialties.map(specialty => specialty.specialties_listID).sort((a,b)=>a-b); // spoken languages are those that are on server side. state changes when languages added/deleted

  let shouldSave = false;

  if(!savedSpecialtyIDs.length && !specialtyIds.length) {
    // Case where both arrays are empty
    setSpecialtiesConfirmation({messageType: 'none'});
    return;
  }
  
  if(!savedSpecialtyIDs.length || !savedSpecialtyIDs){
    shouldSave = !!specialtyIds.length
  }else if((!checkIfListsAreEqual(specialtyIds, savedSpecialtyIDs))){
    shouldSave = true;
  }else{
    setSpecialtiesConfirmation({messageType: 'same'});
  }

  if(shouldSave){
    try {
      const response = await PrivateDoctorDataService.saveGeneralData(specialtyIds, 'Specialty')
      if(response.status === 200){
        DoctorAccountDetails[2] = doctorSpecialties;
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
  const savedPreVetEducations = DoctorAccountDetails?.[3] || []

  let shouldSave = false;

  if(!savedPreVetEducations.length && !preVetEducation.length) {
    // Case where both arrays are empty
    setPreVetEducationConfirmation({messageType: 'none'});
    return;
  }

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
        listDetails[3].find(school => school.School_name === obj.School_name)?.pre_vet_school_listID || null,
        listDetails[5].find(major => major.Major_name === obj.Major_name)?.major_listID || null,
        listDetails[4].find(educationType => educationType.Education_type === obj.Education_type)?.pre_vet_education_typeID || null,
        convertDateForSql(obj.Start_Date),
        convertDateForSql(obj.End_Date)
      ]);
      const response = await PrivateDoctorDataService.saveEducationData(mappedArray, 'pre_vet')
      if(response.status === 200){
        DoctorAccountDetails[3] = preVetEducation;
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
  const savedVetEducations = DoctorAccountDetails?.[4] || []

  let shouldSave = false;

  if(!savedVetEducations.length && !vetEducation.length) {
    // Case where both arrays are empty
    setVetEducationConfirmation({messageType: 'none'});
    return;
  }

  if (!savedVetEducations || !savedVetEducations.length) {
    shouldSave = !!vetEducation.length;
  } else if (!areArraysSame(vetEducation, savedVetEducations)) {
    shouldSave = true;
  } else {
    setVetEducationConfirmation({messageType: 'same'});
  }

  if(shouldSave){//only saves if the educations changed
    try {
      const mappedArray = vetEducation.map(obj => [
        listDetails[6].find(school => school.School_name === obj.School_name)?.vet_school_listID || null,
        listDetails[7].find(educationType => educationType.Education_Type === obj.Education_Type)?.vet_education_typeID || null,
        convertDateForSql(obj.Start_Date),
        convertDateForSql(obj.End_Date)
      ]);
      const response = await PrivateDoctorDataService.saveEducationData(mappedArray, 'vet')
      if(response.status === 200){
        DoctorAccountDetails[4] = vetEducation;
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
  const savedLocationData = DoctorAccountDetails?.[5];

  const savedTimes = savedLocationData.map(location => location.times);
  const savedAddresses = savedLocationData.map(({ times, ...rest }) => rest);
  const newTimes = addresses.map(location => location.times);
  const newAddresses = addresses.map(({ times, ...rest }) => rest);

  let shouldSave = false;

  if(!savedLocationData.length && !addresses.length) {
    // Case where both arrays are empty
    setAddressesConfirmation({messageType: 'none'});
    return;
  }

  if (!savedLocationData || !savedLocationData.length) {
    shouldSave = !!addresses.length;
 } else if ((!areArraysSame(newAddresses, savedAddresses)) || (!areArraysSame(newTimes, savedTimes))) {
    shouldSave = true;
  } else {
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
        DoctorAccountDetails[5] = newAddressData;
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
  const savedDescriptionData = DoctorAccountDetails[6].Description;

  let shouldSave = false;

  if(!savedDescriptionData.length && !description.Description.length) {
    // Case where both arrays are empty
    setDescriptionConfirmation({messageType: 'none'});
    return;
  }

  if (!savedDescriptionData || !savedDescriptionData.length) {
    shouldSave = !!description.Description.length;
  } else if (description.Description !== savedDescriptionData) {
    shouldSave = true;
  }else{
    setDescriptionConfirmation({messageType: 'same'});
  }

  if(shouldSave){//makes sure that it's only pushing to DB if description changed
    try {
      const response = await PrivateDoctorDataService.saveDescriptionData(description);
      if(response.status === 200){
        DoctorAccountDetails[6] = description;
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

export async function savePets(servicedPets, setPetsConfirmation){
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  const savedPets = DoctorAccountDetails?.[7] || []
  const savedPetsIDs = savedPets.map(pet => pet.pet_listID).sort((a,b)=>a-b);
  const petIds = servicedPets.map(pet => pet.pet_listID).sort((a,b)=>a-b); // servicedPets are those that are on server side. state changes when languages added/deleted

  let shouldSave = false;

  if(!savedPetsIDs.length && !petIds.length) {
    // Case where both arrays are empty
    setPetsConfirmation({messageType: 'none'});
    return;
  }

  if(!savedPetsIDs.length || !savedPetsIDs){
    shouldSave = !!petIds.length
  }else if((!checkIfListsAreEqual(petIds, savedPetsIDs))){
    shouldSave = true;
  }else{
    setPetsConfirmation({messageType: 'same'});
  }

  if(shouldSave){//checks if they are the same
    try {
      const response = await PrivateDoctorDataService.saveGeneralData(petIds, 'pet')
      if(response.status === 200){
        DoctorAccountDetails[7] = servicedPets;
        sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
        setPetsConfirmation({messageType: 'saved'});
      }
    } catch(error) {
      setPetsConfirmation({messageType: 'problem'});
      console.log('error in saving pets', error)
    }
  }else{
    setPetsConfirmation({messageType: 'same'});
  }
};

export async function handlePublicAvailibilityToggle (value, setPubliclyAvailable, setPubliclyAvailableConfirmation) {
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  try{
    const response = await PrivateDoctorDataService.savePublicAvailibility(value);
    if(response.status === 200){
      setPubliclyAvailable(value);
      DoctorAccountDetails[8][0].PubliclyAvailable = value;
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
      setPubliclyAvailableConfirmation({messageType: 'saved'});
    }
  }catch(error){
    setPubliclyAvailableConfirmation({messageType: 'problem'});
    console.log('error in handlePublicAvailibilityToggle', error)
  }
};
