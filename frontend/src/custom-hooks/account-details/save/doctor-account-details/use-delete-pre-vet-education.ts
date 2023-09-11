import { useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"

export default async function useDeletePreVetEducationItem(
	preVetEducationMappingId: number,
	preVetEducation: PreVetEducationItem[],
	setPreVetEducation: React.Dispatch<React.SetStateAction<PreVetEducationItem[]>>,
	setPreVetEducationConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	const { doctorAccountDetails } = useContext(AppContext)

	try {
		const response = await PrivateDoctorDataService.deletePreVetEducationData(preVetEducationMappingId)
		if (response.status === 200) {
			const newPreVetEducation = preVetEducation.filter(object => object.preVetEducationMappingId !== preVetEducationMappingId)
			setPreVetEducation(newPreVetEducation)
			doctorAccountDetails!.preVetEducation = newPreVetEducation
			setPreVetEducationConfirmation({messageType: "saved"})
		} else {
			setPreVetEducationConfirmation({messageType: "problem"})
			return
		}
	} catch (error: unknown) {
		handle401AxiosErrorAndSetMessageType(error, setPreVetEducationConfirmation)
	}
}
