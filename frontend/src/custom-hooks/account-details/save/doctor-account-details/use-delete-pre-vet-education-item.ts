import { useContext } from "react"
import AppContext from "src/contexts/maroon-context"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"

export default function useDeletePreVetEducationItem(): (
	preVetEducationMappingId: number,
	setPreVetEducationConfirmation: (conf: ConfirmationMessage) => void
) => Promise<void> {
	const doctorAccountDetails = useContext(AppContext).privateDoctorData?.doctorAccountDetails

	return async (preVetEducationMappingId: number, setPreVetEducationConfirmation: (conf: ConfirmationMessage) => void): Promise<void> => {
		try {
			const response = await PrivateDoctorDataService.deletePreVetEducationData(preVetEducationMappingId)
			if (response.status === 200) {
				const newPreVetEducation = doctorAccountDetails!.preVetEducation.filter(
					object => object.preVetEducationMappingId !== preVetEducationMappingId
				)
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
}
