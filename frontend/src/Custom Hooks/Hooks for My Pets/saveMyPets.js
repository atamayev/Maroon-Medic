import PrivatePatientDataService from "../../Services/private-patient-data-service";
import { checkIfListsAreEqual } from "../lists-and-object-checks";

export async function saveMyPets(petData, setPetData, setPetConfirmation, addOrDelete){
  const savedPatientPetData = JSON.parse(sessionStorage.getItem("PatientPetData"));
   
  let shouldSave = false;

  if(!savedPatientPetData.length && !petData.length) {
    // Case where both arrays are empty
    setPetConfirmation({messageType: 'none'});
    return;
  }

  if(!savedPatientPetData.length || !savedPatientPetData){
    shouldSave = !!petData.length
  }else if((!checkIfListsAreEqual(petData, savedPatientPetData))){
    shouldSave = true;
  }else{
    setPetConfirmation({messageType: 'same'});
  }

  if(shouldSave){//only saves if the pet data changed
    try {
      const response = await PrivatePatientDataService.savePetData(petData, addOrDelete)
      if(response.status === 200){
        const newPetData = response.data;
        setPetData(newPetData);
        sessionStorage.setItem("PatientPetData", JSON.stringify(newPetData));
        setPetConfirmation({messageType: 'saved'});
      }
    } catch(error) {
      setPetConfirmation({messageType: 'problem'});
      console.log('error in saving Pet Data', error)
    }
  }else{
    setPetConfirmation({messageType: 'same'});
  }
};
