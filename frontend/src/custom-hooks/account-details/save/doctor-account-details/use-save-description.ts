import { useContext } from "react"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import shouldSaveDescription from "src/utils/save-account-details"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"
import AppContext from "src/contexts/maroon-context"

export default function useSaveDescription() : (
	description: string,
	setDescriptionConfirmation: (conf: ConfirmationMessage) => void
) => Promise<void> {
	const doctorAccountDetails = useContext(AppContext).privateDoctorData?.doctorAccountDetails

	return async (description, setDescriptionConfirmation): Promise<void> => {
		const shouldSave = shouldSaveDescription(doctorAccountDetails!.description, description)

		if (!shouldSave) {
			setDescriptionConfirmation({messageType: "same"})
			return
		}

		try {
			const response = await PrivateDoctorDataService.saveDescriptionData(description)
			if (response.status === 200) {
				doctorAccountDetails!.description = description
				setDescriptionConfirmation({messageType: "saved"})
			}
		} catch (error: unknown) {
			handle401AxiosErrorAndSetMessageType(error, setDescriptionConfirmation)
		}
	}
}
