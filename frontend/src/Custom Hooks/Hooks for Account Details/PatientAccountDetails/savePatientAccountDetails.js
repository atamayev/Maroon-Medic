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
    }
  }else{
    setInsurancesConfirmation({messageType: 'same'});
  }
};

export async function savePatientLanguages(languageID, spokenLanguages, setLanguagesConfirmation, operationType){
  const PatientAccountDetails = JSON.parse(sessionStorage.getItem("PatientAccountDetails"));
  let response;
  try{
    response = await PrivatePatientDataService.saveGeneralData(languageID, 'Language', operationType)
  }catch(error){
    setLanguagesConfirmation({messageType: 'problem'});
    return
  }
  if(response.status === 200){
    PatientAccountDetails[1] = spokenLanguages;
    sessionStorage.setItem("PatientAccountDetails", JSON.stringify(PatientAccountDetails));
    setLanguagesConfirmation({messageType: 'saved'});
  }else{
    setLanguagesConfirmation({messageType: 'problem'});
  }
};
