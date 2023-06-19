import { checkIfListsAreEqual, areArraysSame} from "../../lists-and-object-checks";
import PrivateDoctorDataService from "../../../Services/private-doctor-data-service";
import moment from "moment"
import _ from "lodash"
import { invalidUserAction } from "../../user-verification-snippets";

export async function saveDoctorLanguages(languageID, spokenLanguages, setLanguagesConfirmation, operationType) {
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  let response;
  try {
    response = await PrivateDoctorDataService.saveGeneralData(languageID, 'Language', operationType)
  } catch(error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setLanguagesConfirmation({messageType: 'problem'});
    return
  }
  if (response.status === 200) {
    DoctorAccountDetails[0] = spokenLanguages;
    sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
    setLanguagesConfirmation({messageType: 'saved'});
  } else {
    setLanguagesConfirmation({messageType: 'problem'});
  }
};

export async function saveServices(providedServices, setServicesConfirmation) {
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  const savedServices = DoctorAccountDetails?.[1] || [];
  const createServiceKey = (service) => `${service.service_and_category_listID}-${service.Service_price}-${service.Service_time}`;

  const savedServiceKeys = savedServices.map(service => createServiceKey(service)).sort();
  const serviceKeys = providedServices.map(service => createServiceKey(service)).sort();
  
  let shouldSave = false;

  if (_.isEmpty(savedServiceKeys) && _.isEmpty(serviceKeys)) {
    // Case where both arrays are empty
    setServicesConfirmation({messageType: 'none'});
    return;
  }

  if (_.isEmpty(savedServiceKeys) || _.isEmpty(savedServiceKeys)) {
    shouldSave = !_.isEmpty(serviceKeys);
  } else if ((!checkIfListsAreEqual(savedServiceKeys, serviceKeys))) {
    shouldSave = true;
  } else {
    setServicesConfirmation({messageType: 'same'});
  }
  const updatedServices = providedServices.map(service => {
    const { Service_name, Category_name, ...rest } = service;
    return rest;
  });//Only sends back the IDs, time, and price (cuts out unnecessary Service_name and category_name)

  if (shouldSave) {//only saves if the insurances changed
    try {
      const response = await PrivateDoctorDataService.saveServiceData(updatedServices)//Make sure it's accepted services and not something else
      if (response.status === 200) {
        DoctorAccountDetails[1] = providedServices;
        sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
        setServicesConfirmation({messageType: 'saved'});
      }
    } catch(error) {
      if (error.response.status === 401) invalidUserAction(error.response.data)
      else setServicesConfirmation({messageType: 'problem'});
    }
  } else {
    setServicesConfirmation({messageType: 'same'});
  }
};

export async function saveSpecialies(specialtyID, doctorSpecialties, setSelectedOrganization, setSpecialtiesConfirmation, operationType) {
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  let response;
  try {
    response = await PrivateDoctorDataService.saveGeneralData(specialtyID, 'Specialty', operationType)
  } catch(error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setSpecialtiesConfirmation({messageType: 'problem'});
    return
  }
  if (response.status === 200) {
    DoctorAccountDetails[2] = doctorSpecialties;
    sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
    setSpecialtiesConfirmation({messageType: 'saved'});
  } else {
    setSpecialtiesConfirmation({messageType: 'problem'});
    return
  }
  if (operationType === 'add') setSelectedOrganization('');
};

export async function savePreVetEducation(preVetEducationObject, preVetEducation, setPreVetEducation, listDetails, setPreVetEducationConfirmation, operationType) {
  let newPreVetEducation;
  if (operationType === 'delete') {
    try {
      const response = await PrivateDoctorDataService.saveEducationData(preVetEducationObject, 'pre_vet', operationType)
      if (response.status = 200) {
        newPreVetEducation = preVetEducation.filter(object => object.pre_vet_education_mappingID !== preVetEducationObject);
        setPreVetEducation(newPreVetEducation)
      }
      else {
        setPreVetEducationConfirmation({messageType: 'problem'});
        return
      }
    } catch (error) {
      if (error.response.status === 401) invalidUserAction(error.response.data)
      else setPreVetEducationConfirmation({messageType: 'problem'});
      return
    }
  } else if (operationType === 'add') {
    const mappedPreVetEducationObject = {
      School_ID: listDetails[3].find(school => school.School_name === preVetEducationObject.School_name)?.pre_vet_school_listID || null,
      Major_ID: listDetails[5].find(major => major.Major_name === preVetEducationObject.Major_name)?.major_listID || null,
      Education_type_ID: listDetails[4].find(educationType => educationType.Education_type === preVetEducationObject.Education_type)?.pre_vet_education_typeID || null,
      Start_date: moment(preVetEducationObject.Start_Date, "MMMM D, YYYY").format("YYYY-MM-DD"),
      End_date: moment(preVetEducationObject.End_Date, "MMMM D, YYYY").format("YYYY-MM-DD")
    }
    try {
      const response = await PrivateDoctorDataService.saveEducationData(mappedPreVetEducationObject, 'pre_vet', operationType)
      if (response.status = 200) {
        preVetEducationObject.pre_vet_education_mappingID = JSON.stringify(response.data)
        newPreVetEducation = [...preVetEducation, preVetEducationObject]
        setPreVetEducation(newPreVetEducation)
      }
      else{
        setPreVetEducationConfirmation({messageType: 'problem'});
        return
      }
    } catch (error) {
      if (error.response.status === 401) invalidUserAction(error.response.data)
      else setPreVetEducationConfirmation({messageType: 'problem'});
      return
    }
  }
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  DoctorAccountDetails[3] = newPreVetEducation;
  sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
  setPreVetEducationConfirmation({messageType: 'saved'});
};

export async function saveVetEducation(vetEducationObject, vetEducation, setVetEducation, listDetails, setVetEducationConfirmation, operationType) {
  let newVetEducation;
  if (operationType === 'delete') {
    try {
      const response = await PrivateDoctorDataService.saveEducationData(vetEducationObject, 'vet', operationType)
      if (response.status = 200) {
        newVetEducation = vetEducation.filter(object => object.vet_education_mappingID !== vetEducationObject);
        setVetEducation(newVetEducation)
      }
      else {
        setVetEducationConfirmation({messageType: 'problem'});
        return
      }
    } catch (error) {
      if (error.response.status === 401) invalidUserAction(error.response.data)
      else setVetEducationConfirmation({messageType: 'problem'});
      return
    }
  } else if (operationType === 'add') {
    const mappedVetEducationObject = {
      School_ID: listDetails[6].find(school => school.School_name === vetEducationObject.School_name)?.vet_school_listID || null,
      Education_type_ID: listDetails[7].find(educationType => educationType.Education_Type === vetEducationObject.Education_Type)?.vet_education_typeID || null,
      Start_date: moment(vetEducationObject.Start_Date, "MMMM D, YYYY").format("YYYY-MM-DD"),
      End_date: moment(vetEducationObject.End_Date, "MMMM D, YYYY").format("YYYY-MM-DD")
    };
    try {
      const response = await PrivateDoctorDataService.saveEducationData(mappedVetEducationObject, 'vet', operationType)
      if (response.status = 200) {
        vetEducationObject.vet_education_mappingID = JSON.stringify(response.data)
        newVetEducation = [...vetEducation, vetEducationObject]
        setVetEducation(newVetEducation)
      }
      else {
        setVetEducationConfirmation({messageType: 'problem'});
        return
      }
    } catch (error) {
      if (error.response.status === 401) invalidUserAction(error.response.data)
      else setVetEducationConfirmation({messageType: 'problem'});
      return
    }
  }
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  DoctorAccountDetails[4] = newVetEducation;
  sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
  setVetEducationConfirmation({ messageType: 'saved' });
};

export async function saveLocation (addresses, setAddresses, setAddressesConfirmation) {
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  const savedLocationData = DoctorAccountDetails?.[5];

  const savedTimes = savedLocationData.map(location => location.times);
  const savedAddresses = savedLocationData.map(({ times, ...rest }) => rest);
  const newTimes = addresses.map(location => location.times);
  const newAddresses = addresses.map(({ times, ...rest }) => rest);

  let shouldSave = false;

  if (_.isEmpty(savedLocationData) && _.isEmpty(addresses)) {
    // Case where both arrays are empty
    setAddressesConfirmation({messageType: 'none'});
    return;
  }

  if (!savedLocationData || _.isEmpty(savedLocationData)) {
    shouldSave = !_.isEmpty(addresses);
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
      if (error.response.status === 401) invalidUserAction(error.response.data)
      else setAddressesConfirmation({messageType: 'problem'});
    }
  } else {
    setAddressesConfirmation({messageType: 'same'});
  }
};

export async function saveDescription(description, setDescriptionConfirmation) {
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  const savedDescriptionData = DoctorAccountDetails[6].Description;

  let shouldSave = false;

  if (_.isEmpty(savedDescriptionData) && _.isEmpty(description.Description)) {
    // Case where both arrays are empty
    setDescriptionConfirmation({messageType: 'none'});
    return;
  }

  if (!savedDescriptionData || _.isEmpty(savedDescriptionData)) {
    shouldSave = !_.isEmpty(description.Description);
  } else if (description.Description !== savedDescriptionData) {
    shouldSave = true;
  } else {
    setDescriptionConfirmation({messageType: 'same'});
  }

  if (shouldSave) {//makes sure that it's only pushing to DB if description changed
    try {
      const response = await PrivateDoctorDataService.saveDescriptionData(description);
      if (response.status === 200) {
        DoctorAccountDetails[6] = description;
        sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
        setDescriptionConfirmation({messageType: 'saved'});
      }
    } catch(error) {
      if (error.response.status === 401) invalidUserAction(error.response.data)
      else setDescriptionConfirmation({messageType: 'problem'});
    }
  } else {
    setDescriptionConfirmation({messageType: 'same'});
  }
};

export async function savePets(petID, newServicedPets, setPetsConfirmation, operationType) {
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  let response;
  try {
    response = await PrivateDoctorDataService.saveGeneralData(petID, 'pet', operationType)
  } catch(error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setPetsConfirmation({messageType: 'problem'});
    return
  }
  if (response.status === 200) {
    DoctorAccountDetails[7] = newServicedPets;
    sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
    setPetsConfirmation({messageType: 'saved'});
  } else {
    setPetsConfirmation({messageType: 'problem'});
    return
  }
};

export async function handlePublicAvailibilityToggle (value, setPubliclyAvailable, setPubliclyAvailableConfirmation) {
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  try {
    const response = await PrivateDoctorDataService.savePublicAvailibility(value);
    if (response.status === 200) {
      setPubliclyAvailable(value);
      DoctorAccountDetails[8][0].PubliclyAvailable = value;
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
      setPubliclyAvailableConfirmation({messageType: 'saved'});
    }
  } catch(error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setPubliclyAvailableConfirmation({messageType: 'problem'});
  }
};
