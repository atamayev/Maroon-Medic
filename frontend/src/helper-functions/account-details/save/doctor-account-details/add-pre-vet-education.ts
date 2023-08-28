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
			School_ID: listDetails.preVetSchools
				.find(school => school.schoolName === preVetGeneralEducationItem.schoolName)!.pre_vet_school_listID,
			Major_ID: listDetails.majors.find(major => major.majorName === preVetGeneralEducationItem.majorName)!.major_listID,
			Education_type_ID: listDetails.preVetEducationTypes.find(
				educationType => educationType.educationType === preVetGeneralEducationItem.educationType)!.pre_vet_education_typeID,
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
