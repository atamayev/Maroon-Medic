import { checkIfListsAreEqual} from "../../lists-and-object-checks";
import PrivatePatientDataService from "../../../Services/private-patient-data-service";

export async function saveInsurances(acceptedInsurances, setInsurancesConfirmation){
  const PatientAccountDetails = JSON.parse(sessionStorage.getItem("PatientAccountDetails"));
  const savedInsurances = PatientAccountDetails?.[0] || [];
  const savedInsurancesIDs = savedInsurances.map(insurance => insurance.insurance_listID).sort((a,b)=>a-b);
  const insuranceIds = acceptedInsurances.map(ins => ins.insurance_listID).sort((a,b)=>a-b); // list of all added insurances
  
  let shouldSave = false;

  if(!savedInsurancesIDs.length && !insuranceIds.length) {
    // Case where both arrays are empty
    setInsurancesConfirmation({messageType: 'none'});
    return;
  }

  if(!savedInsurancesIDs.length || !savedInsurancesIDs){
    shouldSave = !!insuranceIds.length
  }else if((!checkIfListsAreEqual(insuranceIds, savedInsurancesIDs))){
    shouldSave = true;
  }else{
    setInsurancesConfirmation({messageType: 'same'});
  }

  if(shouldSave){//only saves if the insurances changed
    try {
      const response = await PrivatePatientDataService.saveGeneralData(insuranceIds, 'Insurance')
      if(response.status === 200){
        PatientAccountDetails[0] = acceptedInsurances;
        sessionStorage.setItem("PatientAccountDetails", JSON.stringify(PatientAccountDetails));
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
  const PatientAccountDetails = JSON.parse(sessionStorage.getItem("PatientAccountDetails"));
  const savedLanguages = PatientAccountDetails?.[1] || []
  const savedLanguagesIDs = savedLanguages.map(language => language.language_listID).sort((a,b)=>a-b);
  const languageIds = spokenLanguages.map(lang => lang.language_listID).sort((a,b)=>a-b); // spoken languages are those that are on server side. state changes when languages added/deleted

  let shouldSave = false;

  if(!savedLanguagesIDs.length && !languageIds.length) {
    // Case where both arrays are empty
    setLanguagesConfirmation({messageType: 'none'});
    return;
  }

  if(!savedLanguagesIDs.length || !savedLanguagesIDs){
    shouldSave = !!languageIds.length
  }else if((!checkIfListsAreEqual(languageIds, savedLanguagesIDs))){
    shouldSave = true;
  }else{
    setLanguagesConfirmation({messageType: 'same'});
  }

  if(shouldSave){//checks if they are the same
    try {
      const response = await PrivatePatientDataService.saveGeneralData(languageIds, 'Language')
      if(response.status === 200){
        PatientAccountDetails[1] = spokenLanguages;
        sessionStorage.setItem("PatientAccountDetails", JSON.stringify(PatientAccountDetails));
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
