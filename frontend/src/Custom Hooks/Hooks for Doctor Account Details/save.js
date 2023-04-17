import { checkIfListsAreEqual, isObjectInArray} from "../lists-and-object-checks";
import PrivateDoctorDataService from "../../Services/private-doctor-data-service";

export async function saveLanguages(spokenLanguages){
    const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
    const languageIds = spokenLanguages.map(lang => lang.language_listID).sort((a,b)=>a-b); // spoken languages are those that are on server side. state changes when languages added/deleted
    const savedLanguages = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))?.[1] || []
    const savedLanguagesIDs = savedLanguages.map(language => language.language_listID).sort((a,b)=>a-b);
  
    if(!checkIfListsAreEqual(languageIds, savedLanguagesIDs)){//checks if they are the same
      try {
        const response = await PrivateDoctorDataService.saveGeneralData(languageIds, 'Language')
        if(response.status === 200){
          DoctorAccountDetails[1] = spokenLanguages;
          sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
          console.log('Saved!');
        }
      } catch(error) {
        console.log('error in saving languages', error)
      }
    }else{
      console.log('same')
    }
};

export async function saveSpecialies(doctorSpecialties){
    const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
    const specialtyIds = doctorSpecialties.map(specialty => specialty.specialties_listID).sort((a,b)=>a-b); // spoken languages are those that are on server side. state changes when languages added/deleted
    const savedSpecialties = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))?.[3] || []
    const savedSpecialtyIDs = savedSpecialties.map(specialty => specialty.specialties_listID).sort((a,b)=>a-b);
  
    if(!checkIfListsAreEqual(specialtyIds, savedSpecialtyIDs)){//checks if they are the same
      try {
        const response = await PrivateDoctorDataService.saveGeneralData(specialtyIds, 'Specialty')
        if(response.status === 200){
          DoctorAccountDetails[3] = doctorSpecialties;
          sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
          console.log('Saved!');
        }
      } catch(error) {
        console.log('error in saving specialites', error)
      }
    }else{
      console.log('same')
    }
};

export async function saveInsurances(acceptedInsurances){
  console.log(acceptedInsurances)
    const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
    const insuranceIds = acceptedInsurances.map(ins => ins.insurance_listID).sort((a,b)=>a-b); // list of all added insurances
    const savedInsurances = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))?.[0] || []
    const savedInsurancesIDs = savedInsurances.map(insurance => insurance.insurance_listID).sort((a,b)=>a-b);
  
    if(!checkIfListsAreEqual(insuranceIds, savedInsurancesIDs)){//only saves if the insurances changed
      try {
        const response = await PrivateDoctorDataService.saveGeneralData(insuranceIds, 'Insurance')
        if(response.status === 200){
          DoctorAccountDetails[0] = acceptedInsurances;
          sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
          console.log('Saved!');
        }
      } catch(error) {
        console.log('error in saving Insurances', error)
      }
    }else{
      console.log('same')
    }
};

export async function saveDescription(description){
    const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
    if(description.Description !== DoctorAccountDetails[7].Description){//makes sure that it's only pushing to DB if description changed
      try {
        const response = await PrivateDoctorDataService.saveDescriptionData(description);
        if(response.status === 200){
          DoctorAccountDetails[7] = description;
          sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
          console.log('Saved!');
        }
      } catch(error) {
        console.log('error in saveDescription', error)
      }
    }else{
        console.log('same')
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


export async function savePreVetSchool(preVetEducation, listDetails){
    const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
    const savedPreVetEducations = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))?.[4] || []
    // Makes sure that the education is not the same before writing to DB:
    console.log(preVetEducation)
    console.log(savedPreVetEducations)
    if(!preVetEducation.every(arr => savedPreVetEducations.some(savedArr => JSON.stringify(savedArr) === JSON.stringify(arr)))){
      try {
        const mappedArray = preVetEducation.map(obj => [
          listDetails[4].find(school => school.School_name === obj.School_name)?.pre_vet_school_listID || null,
          listDetails[6].find(major => major.Major_name === obj.Major_name)?.major_listID || null,
          listDetails[5].find(educationType => educationType.EducationType_name === obj.EducationType_name)?.pre_vet_education_typeID || null,
          convertDateForSql(obj.Start_Date),
          convertDateForSql(obj.End_Date)
        ]);
        const response = await PrivateDoctorDataService.saveEducationData(mappedArray, 'pre_vet')
        if(response.status === 200){
          DoctorAccountDetails[4] = preVetEducation;
          sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
          console.log('Saved!');
        }
      } catch(error) {
        console.log('error in saving PreVets', error)
      }
    }else{
      console.log('same')
    }
};

export async function saveVetSchool(vetEducation){
    const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
    const savedVetEducations = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))?.[5] || []

    if(!isObjectInArray(vetEducation, savedVetEducations)){//only saves if the insurances changed
      try {
        const response = await PrivateDoctorDataService.saveEducationData(vetEducation, 'vet')
        if(response.status === 200){
          DoctorAccountDetails[5] = vetEducation;
          sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
          console.log('Saved!');
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
}
