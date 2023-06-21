import _ from "lodash"
import PrivatePatientDataService from "../../services/private-patient-data-service";
import { checkIfListsAreEqual} from "../lists-and-object-checks";
import { invalidUserAction} from "../user-verification-snippets";

export async function saveInsurances(acceptedInsurances, setInsurancesConfirmation) {
  const PatientAccountDetails = JSON.parse(sessionStorage.getItem("PatientAccountDetails"));
  const savedInsurances = PatientAccountDetails?.insurances || [];
  const savedInsurancesIDs = savedInsurances.map(insurance => insurance.insurance_listID).sort((a,b)=>a-b);
  const insuranceIds = acceptedInsurances.map(ins => ins.insurance_listID).sort((a,b)=>a-b); // list of all added insurances
  
  let shouldSave = false;

  if (_.isEmpty(savedInsurancesIDs) && _.isEmpty(insuranceIds)) {
    // Case where both arrays are empty
    setInsurancesConfirmation({messageType: 'none'});
    return;
  }

  if (!savedInsurancesIDs || _.isEmpty(savedInsurancesIDs)) {
    shouldSave = !_.isEmpty(insuranceIds);
  } else if ((!checkIfListsAreEqual(insuranceIds, savedInsurancesIDs))) {
    shouldSave = true;
  } else {
    setInsurancesConfirmation({messageType: 'same'});
  }

  if (shouldSave) {//only saves if the insurances changed
    try {
      const response = await PrivatePatientDataService.saveGeneralData(insuranceIds, 'Insurance')
      if (response.status === 200) {
        PatientAccountDetails.insurances = acceptedInsurances;
        sessionStorage.setItem("PatientAccountDetails", JSON.stringify(PatientAccountDetails));
        setInsurancesConfirmation({messageType: 'saved'});
      }
    } catch(error) {
      if (error.response.status === 401) invalidUserAction(error.response.data)
      else setInsurancesConfirmation({messageType: 'problem'});
    }
  } else {
    setInsurancesConfirmation({messageType: 'same'});
  }
};

export async function savePatientLanguages(languageID, spokenLanguages, setLanguagesConfirmation, operationType) {
  const PatientAccountDetails = JSON.parse(sessionStorage.getItem("PatientAccountDetails"));
  let response;
  try {
    response = await PrivatePatientDataService.saveLanguageData(languageID, operationType)
  } catch(error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setLanguagesConfirmation({messageType: 'problem'});
    return
  }
  if (response.status === 200) {
    PatientAccountDetails.languages = spokenLanguages;
    sessionStorage.setItem("PatientAccountDetails", JSON.stringify(PatientAccountDetails));
    setLanguagesConfirmation({messageType: 'saved'});
  } else {
    setLanguagesConfirmation({messageType: 'problem'});
  }
};
