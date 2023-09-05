import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"

export default async function deletePreVetEducation(
	preVetEducationMappingId: number,
	preVetEducation: PreVetEducationItem[],
	setPreVetEducation: React.Dispatch<React.SetStateAction<PreVetEducationItem[]>>,
	setPreVetEducationConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	try {
		const response = await PrivateDoctorDataService.deletePreVetEducationData(preVetEducationMappingId)
		if (response.status === 200) {
			const newPreVetEducation = preVetEducation.filter(object => object.preVetEducationMappingId !== preVetEducationMappingId)
			setPreVetEducation(newPreVetEducation)
			const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") || "{}")
			DoctorAccountDetails.preVetEducation = newPreVetEducation
			sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
			setPreVetEducationConfirmation({messageType: "saved"})
		} else {
			setPreVetEducationConfirmation({messageType: "problem"})
			return
		}
	} catch (error: unknown) {
		handle401AxiosErrorAndSetMessageType(error, setPreVetEducationConfirmation)
	}
}