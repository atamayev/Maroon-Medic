import dayjs from "dayjs"
import { useContext } from "react"
import AppContext from "src/contexts/maroon-context"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"

export default function useAddVetEducation() : (
	vetGeneralEducationItem: VetEducationItem,
	setVetEducationConfirmation: (conf: ConfirmationMessage) => void
) => Promise<void> {
	const { privateDoctorData } = useContext(AppContext)

	return async (
		vetGeneralEducationItem: VetEducationItem,
		setVetEducationConfirmation: (conf: ConfirmationMessage) => void
	): Promise<void> => {
		try {
			const mappedVetGeneralEducationItem: VetEducationData = {
				schoolId: privateDoctorData.doctorLists!.vetSchools.find(
					school => school.schoolName === vetGeneralEducationItem.schoolName
				)!.vetSchoolListId,
				educationTypeId: privateDoctorData.doctorLists!.vetEducationTypes.find(
					educationType => educationType.educationType === vetGeneralEducationItem.educationType)!.vetEducationTypeId,
				startDate: dayjs(vetGeneralEducationItem.startDate, "MMMM D, YYYY").format("YYYY-MM-DD"),
				endDate: dayjs(vetGeneralEducationItem.endDate, "MMMM D, YYYY").format("YYYY-MM-DD")
			}
			const response = await PrivateDoctorDataService.addVetEducationData(mappedVetGeneralEducationItem)
			if (response.status === 200 && typeof response.data === "number") {
				vetGeneralEducationItem.vetEducationMappingId = response.data
				const newVetEducation = [...privateDoctorData.doctorAccountDetails!.vetEducation, vetGeneralEducationItem]
				privateDoctorData.doctorAccountDetails!.vetEducation = newVetEducation
				setVetEducationConfirmation({messageType: "saved"})
			} else {
				setVetEducationConfirmation({messageType: "problem"})
				return
			}
		} catch (error: unknown) {
			handle401AxiosErrorAndSetMessageType(error, setVetEducationConfirmation)
		}
	}
}
