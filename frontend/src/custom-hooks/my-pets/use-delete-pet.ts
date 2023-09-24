import { useContext } from "react"
import AppContext from "src/contexts/maroon-context"
import PrivatePatientDataService from "../../services/private-patient-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"

export default function useDeletePet() : (
	petInfoId: number,
	setPetConfirmation: (conf: ConfirmationMessage) => void
) => Promise<void> {
	const appContext = useContext(AppContext)

	return async (petInfoId, setPetConfirmation): Promise<void> => {
		try {
			const response = await PrivatePatientDataService.deletePetData(petInfoId)
			if (response.status === 200) {
				appContext.patientPetData = appContext.patientPetData.filter(item => item.petInfoId !== petInfoId)
			} else {
				setPetConfirmation({messageType: "problem"})
			}
		} catch (error: unknown) {
			handle401AxiosErrorAndSetMessageType(error, setPetConfirmation)
		}
	}
}
