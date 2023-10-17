import { useContext } from "react"
import PrivateDoctorDataService from "../../../../services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"
import AppContext from "src/contexts/maroon-context"
import _ from "lodash"

type SpecialtyOperationsType = typeof PrivateDoctorDataService.deleteSpecialty |
                               typeof PrivateDoctorDataService.addSpecialty

export default function useModifyDoctorSpecialties() : (
	operation: SpecialtyOperationsType,
	specialtyId: number,
	newDoctorSpecialties: SpecialtyItem[],
	setSpecialtiesConfirmation: (conf: ConfirmationMessage) => void,
	callback: () => void
) => Promise<void> {
	const doctorAccountDetails = useContext(AppContext).privateDoctorData?.doctorAccountDetails

	return async (
		operation: SpecialtyOperationsType,
		specialtyId: number,
		newDoctorSpecialties: SpecialtyItem[],
		setSpecialtiesConfirmation: (conf: ConfirmationMessage) => void,
		callback: () => void
	): Promise<void> => {
		if (_.isNil(doctorAccountDetails)) return

		let response

		try {
			response = await operation(specialtyId)
		} catch (error: unknown) {
			handle401AxiosErrorAndSetMessageType(error, setSpecialtiesConfirmation)
			return
		}

		if (response.status === 200) {
			doctorAccountDetails.specialties = newDoctorSpecialties
			setSpecialtiesConfirmation({messageType: "saved"})
		} else {
			setSpecialtiesConfirmation({messageType: "problem"})
			return
		}
		callback()
	}
}
