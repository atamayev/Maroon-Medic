import PrivatePatientDataService from "../../Services/private-patient-data-service";

export async function addMyPets(petData, setPetData, setPetConfirmation, savedPetData, setSavedPetData, setShowAddPet) {
  let response;

  try {
    response = await PrivatePatientDataService.savePetData(petData, 'add')
  } catch(error) {
    setPetConfirmation({messageType: 'problem'});
  }

  if (response.status === 200) {
    const newPetData = response.data;
    const updatedSavedPetData = [...savedPetData, newPetData];
    setSavedPetData(updatedSavedPetData);
    sessionStorage.setItem("PatientPetData", JSON.stringify(updatedSavedPetData));
    setPetConfirmation({messageType: 'saved'});
    setPetData({});
    setShowAddPet(false);
  } else {
    setPetConfirmation({messageType: 'problem'});
  }
};

export async function deleteMyPets(petID, savedPetData, setSavedPetData, setPetConfirmation) {
  let response;

  try {
    response = await PrivatePatientDataService.savePetData(petID, 'delete')
  } catch(error) {
    setPetConfirmation({messageType: 'problem'});
  }

  if (response.status === 200) {
    const updatedSavedPetData = savedPetData.filter(item => item.pet_infoID !== petID);
    setSavedPetData(updatedSavedPetData);
    sessionStorage.setItem("PatientPetData", JSON.stringify(updatedSavedPetData));
  } else {
    setPetConfirmation({messageType: 'problem'});
  }
};
