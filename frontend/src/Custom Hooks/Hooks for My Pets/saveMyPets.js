import PrivatePatientDataService from "../../Services/private-patient-data-service";

export async function saveMyPets(petData, setPetData, setPetConfirmation, savedPetData, setSavedPetData, operationType, setShowAddPet){
  let response;
  console.log(savedPetData)

  if(operationType === 'add'){
    try {
      response = await PrivatePatientDataService.savePetData(petData, operationType)
    }catch(error){
      setPetConfirmation({messageType: 'problem'});
      console.log('error in inserting Pet Data', error)
    }
  }else if (operationType === 'update' || operationType === 'delete'){
    try {
      response = await PrivatePatientDataService.savePetData(savedPetData, operationType)
    }catch(error){
      setPetConfirmation({messageType: 'problem'});
      console.log('error in updating/deleting Pet Data', error)
    }
  }else{
    setPetConfirmation({messageType: 'problem'});
    console.log('incorrect operationType')
    return;
  }

  if(response.status === 200){
    if(operationType === 'add'){
      const newPetData = response.data;
      const updatedSavedPetData = [...savedPetData, newPetData];
      setSavedPetData(updatedSavedPetData);
      sessionStorage.setItem("PatientPetData", JSON.stringify(updatedSavedPetData));
      setPetConfirmation({messageType: 'saved'});
      setPetData({});
      setShowAddPet(false);
    }else if (operationType === 'update'){
      const savedPetInfoID = petData.pet_infoID;
      const updatedSavedPetData = savedPetData.map(item => {
        if (item.pet_infoID === savedPetInfoID) {
          return { ...petData };
        }
        return item;
      });
      setSavedPetData(updatedSavedPetData);
      sessionStorage.setItem("PatientPetData", JSON.stringify(updatedSavedPetData));
    }else if (operationType === 'delete'){
      const deletedPetInfoID = petData.pet_infoID;
      const updatedSavedPetData = savedPetData.filter(item => item.pet_infoID !== deletedPetInfoID);
      console.log(updatedSavedPetData)
      setSavedPetData(updatedSavedPetData);
      sessionStorage.setItem("PatientPetData", JSON.stringify(updatedSavedPetData));
    }else{
      setPetConfirmation({messageType: 'problem'});
      console.log('incorrect operationType')
    }
  }
  else{
    setPetConfirmation({messageType: 'problem'});
    console.log('error in saving Pet Data')
  }
};
