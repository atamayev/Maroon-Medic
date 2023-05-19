import { checkIfListsAreEqual, areArraysSame, arraysEqual} from "../lists-and-object-checks";
import PrivateDoctorDataService from "../../Services/private-doctor-data-service";

export async function saveLanguages(spokenLanguages, setShowSavedLanguagesMessage){
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  const languageIds = spokenLanguages.map(lang => lang.language_listID).sort((a,b)=>a-b); // spoken languages are those that are on server side. state changes when languages added/deleted
  const savedLanguages = DoctorAccountDetails?.[1] || []
  const savedLanguagesIDs = savedLanguages.map(language => language.language_listID).sort((a,b)=>a-b);

  if(!checkIfListsAreEqual(languageIds, savedLanguagesIDs)){//checks if they are the same
    try {
      const response = await PrivateDoctorDataService.saveGeneralData(languageIds, 'Language')
      if(response.status === 200){
        DoctorAccountDetails[1] = spokenLanguages;
        sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
        console.log('Saved!');
        // Show the saved message
        setShowSavedLanguagesMessage(true);

        // Hide the saved message after 5 seconds
        setTimeout(() => {
          setShowSavedLanguagesMessage(false);
        }, 5000);
      }
    } catch(error) {
      console.log('error in saving languages', error)
    }
  }else{
    console.log('same')
  }
};

export async function saveSpecialies(doctorSpecialties, setShowSavedSpecialtiesMessage){
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  const specialtyIds = doctorSpecialties.map(specialty => specialty.specialties_listID).sort((a,b)=>a-b); // spoken languages are those that are on server side. state changes when languages added/deleted
  const savedSpecialties = DoctorAccountDetails?.[3] || []
  const savedSpecialtyIDs = savedSpecialties.map(specialty => specialty.specialties_listID).sort((a,b)=>a-b);

  if(!checkIfListsAreEqual(specialtyIds, savedSpecialtyIDs)){//checks if they are the same
    try {
      const response = await PrivateDoctorDataService.saveGeneralData(specialtyIds, 'Specialty')
      if(response.status === 200){
        DoctorAccountDetails[3] = doctorSpecialties;
        sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
        console.log('Saved!');
        // Show the saved message
        setShowSavedSpecialtiesMessage(true);

        // Hide the saved message after 5 seconds
        setTimeout(() => {
          setShowSavedSpecialtiesMessage(false);
        }, 5000);
      }
    } catch(error) {
      console.log('error in saving specialites', error)
    }
  }else{
    console.log('same')
  }
};

export async function saveInsurances(acceptedInsurances, setShowSavedInsurancesMessage){
  console.log(acceptedInsurances)
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  const insuranceIds = acceptedInsurances.map(ins => ins.insurance_listID).sort((a,b)=>a-b); // list of all added insurances
  const savedInsurances = DoctorAccountDetails?.[0] || []
  const savedInsurancesIDs = savedInsurances.map(insurance => insurance.insurance_listID).sort((a,b)=>a-b);

  if(!checkIfListsAreEqual(insuranceIds, savedInsurancesIDs)){//only saves if the insurances changed
    try {
      const response = await PrivateDoctorDataService.saveGeneralData(insuranceIds, 'Insurance')
      if(response.status === 200){
        DoctorAccountDetails[0] = acceptedInsurances;
        sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
        console.log('Saved!');
        // Show the saved message
        setShowSavedInsurancesMessage(true);

        // Hide the saved message after 5 seconds
        setTimeout(() => {
          setShowSavedInsurancesMessage(false);
        }, 5000);
      }
    } catch(error) {
      console.log('error in saving Insurances', error)
    }
  }else{
    console.log('same')
  }
};

export async function saveServices(selectedServices, setShowSavedServicesMessage){
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

            // Hide the saved message after 5 seconds
            setTimeout(() => {
              setShowSavedServicesMessage(false);
            }, 5000);
          }
      }catch(error) {
        console.log('error in saving Services', error)
      }
  }else {
    console.log('same');
  }
};

export async function saveDescription(description, setShowSavedDescriptionMessage){
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  if(description.Description !== DoctorAccountDetails[7].Description){//makes sure that it's only pushing to DB if description changed
    try {
      const response = await PrivateDoctorDataService.saveDescriptionData(description);
      if(response.status === 200){
        DoctorAccountDetails[7] = description;
        sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
        console.log('Saved!');
        // Show the saved message
        setShowSavedDescriptionMessage(true);

        // Hide the saved message after 5 seconds
        setTimeout(() => {
          setShowSavedDescriptionMessage(false);
        }, 5000);
      }
    } catch(error) {
      console.log('error in saveDescription', error)
    }
  }else{
      console.log('same')
  }
};

export async function saveLocation (addresses, setShowSavedLocationMessage){
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  const savedLocationData = DoctorAccountDetails?.[6]
  if(!savedLocationData || !savedLocationData.length){
    //If no Location Data exists, then just set the session data to the new data, no need to compare arrays
    try {
      console.log('new data')
      const response = await PrivateDoctorDataService.saveAddressData(addresses);
      if(response.status === 200){
        DoctorAccountDetails[6] = addresses;
        sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
        console.log('Saved!');
        // Show the saved message
        setShowSavedLocationMessage(true);

        // Hide the saved message after 5 seconds
        setTimeout(() => {
          setShowSavedLocationMessage(false);
        }, 5000);
      }
    } catch(error) {
      console.log('error in saveLocation', error)
    }
  }else{
    if(!areArraysSame(addresses, savedLocationData)){
      try {
        console.log('comparing data')
        const response = await PrivateDoctorDataService.saveAddressData(addresses);
        if(response.status === 200){
          DoctorAccountDetails[6] = addresses;
          sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
          console.log('Saved!');
          // Show the saved message
          setShowSavedLocationMessage(true);

          // Hide the saved message after 5 seconds
          setTimeout(() => {
            setShowSavedLocationMessage(false);
          }, 5000);
        }
      } catch(error) {
        console.log('error in saveLocation', error)
      }
    }else{
      console.log('same');
    }
    //Compare the addresses array to the savedLocation Data array.
  }
};

function convertDateForSql(dateString) {
  // Split the date string by '-'
  const dateParts = dateString.split('-');

  // Extract the year, month, and day
  const year = dateParts[0];
  const month = new Date(dateParts[1] + '-1-1').getMonth() + 1; // Get month index (0-11) and convert to month number (1-12)
  const day = dateParts[2];

  // Format the date as "YYYY-MM-DD"
  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.padStart(2, '0')}`;

  return formattedDate;
}

export async function savePreVetSchool(preVetEducation, listDetails, setShowSavedPreVetMessage){
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  const savedPreVetEducations = DoctorAccountDetails?.[4] || []
  
  if(!areArraysSame(preVetEducation, savedPreVetEducations)){
    try {
      const mappedArray = preVetEducation.map(obj => [
        listDetails[4].find(school => school.School_name === obj.School_name)?.pre_vet_school_listID || null,
        listDetails[6].find(major => major.Major_name === obj.Major_name)?.major_listID || null,
        listDetails[5].find(educationType => educationType.Education_type === obj.Education_type)?.pre_vet_education_typeID || null,
        convertDateForSql(obj.Start_Date),
        convertDateForSql(obj.End_Date)
      ]);
      const response = await PrivateDoctorDataService.saveEducationData(mappedArray, 'pre_vet')
      console.log(mappedArray)
      if(response.status === 200){
        DoctorAccountDetails[4] = preVetEducation;
        sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
        console.log('Saved!');
        // Show the saved message
        setShowSavedPreVetMessage(true);

        // Hide the saved message after 5 seconds
        setTimeout(() => {
          setShowSavedPreVetMessage(false);
        }, 5000);
      }
    } catch(error) {
      console.log('error in saving PreVets', error)
    }
  }else{
    console.log('same')
  }
};

export async function saveVetSchool(vetEducation, listDetails, setShowSavedVetMessage){
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  const savedVetEducations = DoctorAccountDetails?.[5] || []

  if(!areArraysSame(vetEducation, savedVetEducations)){//only saves if the insurances changed
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
        console.log('Saved!');
        // Show the saved message
        setShowSavedVetMessage(true);

        // Hide the saved message after 5 seconds
        setTimeout(() => {
          setShowSavedVetMessage(false);
        }, 5000);
      }
    } catch(error) {
      console.log('error in saving Insurances', error)
    }
  }else{
    console.log('same')
  }
};

export async function handlePublicAvailibilityToggle (value, setPubliclyAvailable) {
  setPubliclyAvailable(value);
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  try{
    const response = await PrivateDoctorDataService.savePublicAvailibility(value);
    if(response.status === 200){
      DoctorAccountDetails[9][0].PubliclyAvailable = value;
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
      console.log('Saved!');
    }
  }catch(error){
    console.log('error in handlePublicAvailibilityToggle', error)
  }
};
