import { useContext } from "react"
import AppContext from "src/contexts/maroon-context"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"

export default function useDeleteVetEducationItem() : (
	vetEducationMappingId: number,
	setVetEducationConfirmation: (conf: ConfirmationMessage) => void
) => Promise<void> {
	const doctorAccountDetails = useContext(AppContext).privateDoctorData?.doctorAccountDetails

	return async (vetEducationMappingId: number, setVetEducationConfirmation: (conf: ConfirmationMessage) => void): Promise<void> => {
		try {
			const response = await PrivateDoctorDataService.deleteVetEducationData(vetEducationMappingId)
			if (response.status === 200) {
				const newVetEducation = doctorAccountDetails!.vetEducation.filter(
					object => object.vetEducationMappingId !== vetEducationMappingId
				)
				doctorAccountDetails!.vetEducation = newVetEducation
				setVetEducationConfirmation({ messageType: "saved" })
			} else {
				setVetEducationConfirmation({messageType: "problem"})
				return
			}
		} catch (error: unknown) {
			handle401AxiosErrorAndSetMessageType(error, setVetEducationConfirmation)
		}
	}
}
