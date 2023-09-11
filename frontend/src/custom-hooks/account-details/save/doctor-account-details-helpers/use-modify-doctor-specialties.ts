import { useContext } from "react"
import PrivateDoctorDataService from "../../../../services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"
import { AppContext } from "src/contexts/maroon-context"

type SpecialtyOperationsType = typeof PrivateDoctorDataService.deleteSpecialty |
                               typeof PrivateDoctorDataService.addSpecialty

export default async function useModifyDoctorSpecialties(
	operation: SpecialtyOperationsType,
	specialtyId: number,
	newDoctorSpecialties: SpecialtyItem[],
	setDoctorSpecialties: React.Dispatch<React.SetStateAction<SpecialtyItem[]>>,
	setSpecialtiesConfirmation: (conf: ConfirmationMessage) => void,
	callback: () => void
): Promise<void> {
	const { doctorAccountDetails } = useContext(AppContext)
	let response

	try {
		response = await operation(specialtyId)
	} catch (error: unknown) {
		handle401AxiosErrorAndSetMessageType(error, setSpecialtiesConfirmation)
		return
	}

	if (response.status === 200) {
		setDoctorSpecialties(newDoctorSpecialties)
		doctorAccountDetails!.specialties = newDoctorSpecialties
		setSpecialtiesConfirmation({messageType: "saved"})
	} else {
		setSpecialtiesConfirmation({messageType: "problem"})
		return
	}
	callback()
}
