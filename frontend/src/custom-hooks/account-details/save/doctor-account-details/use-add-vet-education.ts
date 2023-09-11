import { useContext } from "react"
import moment from "moment"
import { AppContext } from "src/contexts/maroon-context"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"

export default async function useAddVetEducation(
	vetGeneralEducationItem: VetEducationItem,
	vetEducation: VetEducationItem[],
	setVetEducation: React.Dispatch<React.SetStateAction<VetEducationItem[]>>,
	setVetEducationConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	const appContext = useContext(AppContext)

	try {
		const mappedVetGeneralEducationItem: VetEducationData = {
			schoolId: appContext.doctorLists!.vetSchools.find(
				school => school.schoolName === vetGeneralEducationItem.schoolName
			)!.vetSchoolListId,
			educationTypeId: appContext.doctorLists!.vetEducationTypes.find(
				educationType => educationType.educationType === vetGeneralEducationItem.educationType)!.vetEducationTypeId,
			startDate: moment(vetGeneralEducationItem.startDate, "MMMM D, YYYY").format("YYYY-MM-DD"),
			endDate: moment(vetGeneralEducationItem.endDate, "MMMM D, YYYY").format("YYYY-MM-DD")
		}
		const response = await PrivateDoctorDataService.addVetEducationData(mappedVetGeneralEducationItem)
		if (response.status === 200 && typeof response.data === "number") {
			vetGeneralEducationItem.vetEducationMappingId = response.data
			const newVetEducation = [...vetEducation, vetGeneralEducationItem]
			setVetEducation(newVetEducation)
			appContext.doctorAccountDetails!.vetEducation = newVetEducation
			setVetEducationConfirmation({messageType: "saved"})
		} else {
			setVetEducationConfirmation({messageType: "problem"})
			return
		}
	} catch (error: unknown) {
		handle401AxiosErrorAndSetMessageType(error, setVetEducationConfirmation)
	}
}
