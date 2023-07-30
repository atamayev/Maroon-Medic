import PrivatePatientDataService from "../../services/private-patient-data-service"
import { invalidUserAction } from "../user-verification-snippets"

function petDataOperations (petData, responseData) {
  delete petData.insurance_listID
  delete petData.pet_listID
  petData.pet_infoID = responseData
  return petData
}

export async function addPet(petData, setPetData, setPetConfirmation, savedPetData, setSavedPetData, setShowAddPet) {
  let response

  try {
    response = await PrivatePatientDataService.addPetData(petData)
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setPetConfirmation({messageType: "problem"})
  }

  if (response.status === 200) {
    const updatedPetData = petDataOperations(petData, response.data)
    const newPetData = [...savedPetData, updatedPetData]
    setSavedPetData(newPetData)
    sessionStorage.setItem("PatientPetData", JSON.stringify(newPetData))
    setPetConfirmation({messageType: "saved"})
    setPetData({})
    setShowAddPet(false)
  } else {
    setPetConfirmation({messageType: "problem"})
  }
}

export async function deletePet(pet_infoID, savedPetData, setSavedPetData, setPetConfirmation) {
  let response

  try {
    response = await PrivatePatientDataService.deletePetData(pet_infoID)
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setPetConfirmation({messageType: "problem"})
  }

  if (response.status === 200) {
    const updatedSavedPetData = savedPetData.filter(item => item.pet_infoID !== pet_infoID)
    setSavedPetData(updatedSavedPetData)
    sessionStorage.setItem("PatientPetData", JSON.stringify(updatedSavedPetData))
  } else {
    setPetConfirmation({messageType: "problem"})
  }
}
