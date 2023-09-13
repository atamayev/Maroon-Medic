import { useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"

export default async function useUpdatePublicAvailability(
	value: boolean,
	publiclyAvailable: boolean,
	setPubliclyAvailableConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	const { doctorAccountDetails } = useContext(AppContext)

	if (value === publiclyAvailable) {
		setPubliclyAvailableConfirmation({messageType: "same"})
		return
	}

	try {
		const response = await PrivateDoctorDataService.savePublicAvailibility(value)
		if (response.status === 200) {
			doctorAccountDetails!.publiclyAvailable = value
			setPubliclyAvailableConfirmation({messageType: "saved"})
		}
	} catch (error: unknown) {
		handle401AxiosErrorAndSetMessageType(error, setPubliclyAvailableConfirmation)
	}
}
