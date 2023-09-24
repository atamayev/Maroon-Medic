import { useContext } from "react"
import AppContext from "src/contexts/maroon-context"
import PrivatePatientDataService from "../../services/private-patient-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"

function petDataOperations(petData: PetItemForCreation, responseData: number): SavedPetItem {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { petListId, insuranceListId, ...rest } = petData
	return {
		...rest,
		petInfoId: responseData,
	}
}

export default function useAddPet() : (
	petData: PetItemForCreation,
	setPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>,
	setPetConfirmation: (conf: ConfirmationMessage) => void,
	setShowAddPet: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const appContext = useContext(AppContext)

	return async (petData, setPetData, setPetConfirmation, setShowAddPet): Promise<void> => {
		try {
			const response = await PrivatePatientDataService.addPetData(petData)
			if (response.status === 200 && typeof response.data === "number") {
				const updatedPetData = petDataOperations(petData, response.data)
				const savedPetData = appContext.patientPetData
				const newPetData = [...savedPetData, updatedPetData]
				appContext.patientPetData = newPetData
				setPetConfirmation({messageType: "saved"})
				setPetData({} as PetItemForCreation)
				setShowAddPet(false)
			} else {
				setPetConfirmation({messageType: "problem"})
			}
		} catch (error: unknown) {
			handle401AxiosErrorAndSetMessageType(error, setPetConfirmation)
		}

	}
}
