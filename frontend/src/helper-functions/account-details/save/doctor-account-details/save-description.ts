import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import shouldSaveDescription from "src/utils/save-account-details"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"

export default async function saveDescription(
	description: string,
	setDescriptionConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") || "{}")
	const savedDescriptionData = DoctorAccountDetails.description

	const shouldSave = shouldSaveDescription(savedDescriptionData, description)

	if (!shouldSave) {
		setDescriptionConfirmation({messageType: "same"})
		return
	}

	try {
		const response = await PrivateDoctorDataService.saveDescriptionData(description)
		if (response.status === 200) {
			DoctorAccountDetails.description = description
			sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
			setDescriptionConfirmation({messageType: "saved"})
		}
	} catch (error: unknown) {
		handle401AxiosErrorAndSetMessageType(error, setDescriptionConfirmation)
	}
}
