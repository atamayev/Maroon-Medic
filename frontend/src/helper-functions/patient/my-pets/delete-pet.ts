import PrivatePatientDataService from "../../../services/private-patient-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"

export default async function deletePet(
	petInfoId: number,
	savedPetData: SavedPetItem[],
	setSavedPetData: React.Dispatch<React.SetStateAction<SavedPetItem[]>>,
	setPetConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	let response

	try {
		response = await PrivatePatientDataService.deletePetData(petInfoId)
	} catch (error: unknown) {
		handle401AxiosErrorAndSetMessageType(error, setPetConfirmation)
	}

	if (response && response.status === 200) {
		const updatedSavedPetData = savedPetData.filter(item => item.petInfoId !== petInfoId)
		setSavedPetData(updatedSavedPetData)
		sessionStorage.setItem("PatientPetData", JSON.stringify(updatedSavedPetData))
	} else {
		setPetConfirmation({messageType: "problem"})
	}
}
