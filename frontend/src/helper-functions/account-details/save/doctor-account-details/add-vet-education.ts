import moment from "moment"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"

export default async function addVetEducation(
	vetGeneralEducationItem: VetEducationItem,
	vetEducation: VetEducationItem[],
	setVetEducation: React.Dispatch<React.SetStateAction<VetEducationItem[]>>,
	listDetails: DoctorListDetails,
	setVetEducationConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	try {
		const mappedVetGeneralEducationItem = {
			schoolId: listDetails.vetSchools.find(school => school.schoolName === vetGeneralEducationItem.schoolName)!.vetSchoolListId,
			educationTypeId: listDetails.vetEducationTypes.find(
				educationType => educationType.educationType === vetGeneralEducationItem.educationType)!.vetEducationTypeId,
			startDate: moment(vetGeneralEducationItem.startDate, "MMMM D, YYYY").format("YYYY-MM-DD"),
			endDate: moment(vetGeneralEducationItem.endDate, "MMMM D, YYYY").format("YYYY-MM-DD")
		}
		const response = await PrivateDoctorDataService.addVetEducationData(mappedVetGeneralEducationItem)
		if (response.status === 200) {
			vetGeneralEducationItem.vetEducationMappingId = response.data
			const newVetEducation = [...vetEducation, vetGeneralEducationItem]
			setVetEducation(newVetEducation)
			const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") || "{}")
			DoctorAccountDetails.vetEducation = newVetEducation
			sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
			setVetEducationConfirmation({messageType: "saved"})
		} else {
			setVetEducationConfirmation({messageType: "problem"})
			return
		}
	} catch (error: unknown) {
		handle401AxiosErrorAndSetMessageType(error, setVetEducationConfirmation)
	}
}
