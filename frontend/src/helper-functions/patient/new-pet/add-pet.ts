import PrivatePatientDataService from "../../../services/private-patient-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"

function petDataOperations(petData: PetItemForCreation, responseData: number): SavedPetItem {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { petListId, insuranceListId, ...rest } = petData
	return {
		...rest,
		petInfoId: responseData,
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

	if (response && response.status === 200 && typeof response.data === "number") {
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
