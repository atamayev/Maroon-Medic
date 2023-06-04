import PrivatePatientDataService from "../../Services/private-patient-data-service";

export async function addMyPets(petData, setPetData, setPetConfirmation, savedPetData, setSavedPetData, setShowAddPet){
  let response;

  try {
    response = await PrivatePatientDataService.savePetData(petData, 'add')
  }catch(error){
    setPetConfirmation({messageType: 'problem'});
    console.log('error in inserting Pet Data', error)
  }

  if(response.status === 200){
    const newPetData = response.data;
    const updatedSavedPetData = [...savedPetData, newPetData];
    setSavedPetData(updatedSavedPetData);
    sessionStorage.setItem("PatientPetData", JSON.stringify(updatedSavedPetData));
    setPetConfirmation({messageType: 'saved'});
    setPetData({});
    setShowAddPet(false);
  }else{
    setPetConfirmation({messageType: 'problem'});
    console.log('error in saving Pet Data')
  }
};

export async function updateMyPets(petData, setPetData, setPetConfirmation, savedPetData, setSavedPetData, setShowAddPet){
  let response;

  try {
    response = await PrivatePatientDataService.savePetData(savedPetData, 'update')
  }catch(error){
    setPetConfirmation({messageType: 'problem'});
    console.log('error in updating/deleting Pet Data', error)
  }

  if(response.status === 200){
    const savedPetInfoID = petData.pet_infoID;
    const updatedSavedPetData = savedPetData.map(item => {
      if (item.pet_infoID === savedPetInfoID) {
        return { ...petData };
      }
      return item;
    });
    setSavedPetData(updatedSavedPetData);
    sessionStorage.setItem("PatientPetData", JSON.stringify(updatedSavedPetData));
  }else{
    setPetConfirmation({messageType: 'problem'});
    console.log('error in saving Pet Data')
  }
};

export async function deleteMyPets(petID, savedPetData, setSavedPetData, setPetConfirmation){
  let response;
  console.log(petID)

  try {
    response = await PrivatePatientDataService.savePetData(petID, 'delete')
  }catch(error){
    setPetConfirmation({messageType: 'problem'});
    console.log('error in updating/deleting Pet Data', error)
  }

  if(response.status === 200){
    const updatedSavedPetData = savedPetData.filter(item => item.pet_infoID !== petID);
    console.log('updatedSavedPetData',updatedSavedPetData)
    setSavedPetData(updatedSavedPetData);
    sessionStorage.setItem("PatientPetData", JSON.stringify(updatedSavedPetData));
  }else{
    setPetConfirmation({messageType: 'problem'});
    console.log('error in saving Pet Data')
  }
};
