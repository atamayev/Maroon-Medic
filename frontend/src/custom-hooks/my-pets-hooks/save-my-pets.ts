import { handle401AxiosErrorAndSetError } from "src/utils/handle-errors"
import PrivatePatientDataService from "../../services/private-patient-data-service"

function petDataOperations (petData: PetItemType, responseData: PetItemType) {
  delete petData.insurance_listID
  delete petData.pet_listID
  petData.pet_infoID = responseData
  return petData
}

export async function addPet(
  petData: PetItemType,
  setPetData: React.Dispatch<React.SetStateAction<PetItemType>>,
  setPetConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>,
  savedPetData: PetItemType[],
  setSavedPetData: React.Dispatch<React.SetStateAction<PetItemType[]>>,
  setShowAddPet: React.Dispatch<React.SetStateAction<boolean>>
) {
  let response

  try {
    response = await PrivatePatientDataService.addPetData(petData)
  } catch (error: unknown) {
    handle401AxiosErrorAndSetError(error, setPetConfirmation)
  }

  if (response && response.status === 200) {
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

export async function deletePet(
  pet_infoID: number,
  savedPetData: PetItemType[],
  setSavedPetData: React.Dispatch<React.SetStateAction<PetItemType[]>>,
  setPetConfirmation: React.Dispatch<React.SetStateAction<ConfirmationMessage>>
) {
  let response

  try {
    response = await PrivatePatientDataService.deletePetData(pet_infoID)
  } catch (error: unknown) {
    handle401AxiosErrorAndSetError(error, setPetConfirmation)
  }

  if (response && response.status === 200) {
    const updatedSavedPetData = savedPetData.filter(item => item.pet_infoID !== pet_infoID)
    setSavedPetData(updatedSavedPetData)
    sessionStorage.setItem("PatientPetData", JSON.stringify(updatedSavedPetData))
  } else {
    setPetConfirmation({messageType: "problem"})
  }
}
