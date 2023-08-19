import { handle401AxiosErrorAndSetMessageType } from "src/utils/handle-errors"
import PrivatePatientDataService from "../../services/private-patient-data-service"

function petDataOperations(petData: PetItemForCreation, responseData: number): SavedPetItem {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { pet_listID, insurance_listID, ...rest } = petData
  return {
    ...rest,
    pet_infoID: responseData,
  }
}

export default async function addPet(
  petData: PetItemForCreation,
  setPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>,
  setPetConfirmation: (conf: ConfirmationMessage) => void,
  savedPetData: SavedPetItem[],
  setSavedPetData: React.Dispatch<React.SetStateAction<SavedPetItem[]>>,
  setShowAddPet: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> {
  let response

  try {
    response = await PrivatePatientDataService.addPetData(petData)
  } catch (error: unknown) {
    handle401AxiosErrorAndSetMessageType(error, setPetConfirmation)
  }

  if (response && response.status === 200) {
    const updatedPetData = petDataOperations(petData, response.data)
    const newPetData = [...savedPetData, updatedPetData]
    setSavedPetData(newPetData)
    sessionStorage.setItem("PatientPetData", JSON.stringify(newPetData))
    setPetConfirmation({messageType: "saved"})
    setPetData({} as PetItemForCreation)
    setShowAddPet(false)
  } else {
    setPetConfirmation({messageType: "problem"})
  }
}
