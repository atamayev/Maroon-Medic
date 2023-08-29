import moment from "moment"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"

export default async function addPreVetEducation(
	preVetGeneralEducationItem: PreVetEducationItem,
	preVetEducation: PreVetEducationItem[],
	setPreVetEducation: React.Dispatch<React.SetStateAction<PreVetEducationItem[]>>,
	listDetails: DoctorListDetails,
	setPreVetEducationConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	try {
		const mappedPreVetGeneralEducationItem = {
			schoolId: listDetails.preVetSchools
				.find(school => school.schoolName === preVetGeneralEducationItem.schoolName)!.preVetSchoolListId,
			majorId: listDetails.majors.find(major => major.majorName === preVetGeneralEducationItem.majorName)!.majorListId,
			educationTypeId: listDetails.preVetEducationTypes.find(
				educationType => educationType.educationType === preVetGeneralEducationItem.educationType)!.preVetEducationTypeId,
			startDate: moment(preVetGeneralEducationItem.startDate, "MMMM D, YYYY").format("YYYY-MM-DD"),
			endDate: moment(preVetGeneralEducationItem.endDate, "MMMM D, YYYY").format("YYYY-MM-DD")
		}
		const response = await PrivateDoctorDataService.addPreVetEducationData(mappedPreVetGeneralEducationItem)
		if (response.status === 200) {
			preVetGeneralEducationItem.preVetEducationMappingId = response.data
			const newPreVetEducation = [...preVetEducation, preVetGeneralEducationItem]
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
