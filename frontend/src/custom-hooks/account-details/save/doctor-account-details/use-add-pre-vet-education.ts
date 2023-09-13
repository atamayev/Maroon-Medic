import moment from "moment"
import { useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"

export default async function useAddPreVetEducation(
	preVetGeneralEducationItem: PreVetEducationItem,
	setPreVetEducationConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	const appContext = useContext(AppContext)

	try {
		const mappedPreVetGeneralEducationItem: PreVetEducationData = {
			schoolId: appContext.doctorLists!.preVetSchools
				.find(school => school.schoolName === preVetGeneralEducationItem.schoolName)!.preVetSchoolListId,
			majorId: appContext.doctorLists!.majors.find(major => major.majorName === preVetGeneralEducationItem.majorName)!.majorListId,
			educationTypeId: appContext.doctorLists!.preVetEducationTypes.find(
				educationType => educationType.educationType === preVetGeneralEducationItem.educationType)!.preVetEducationTypeId,
			startDate: moment(preVetGeneralEducationItem.startDate, "MMMM D, YYYY").format("YYYY-MM-DD"),
			endDate: moment(preVetGeneralEducationItem.endDate, "MMMM D, YYYY").format("YYYY-MM-DD")
		}
		const response = await PrivateDoctorDataService.addPreVetEducationData(mappedPreVetGeneralEducationItem)
		if (response.status === 200 && typeof response.data === "number") {
			preVetGeneralEducationItem.preVetEducationMappingId = response.data
			const newPreVetEducation = [...appContext.doctorAccountDetails!.preVetEducation, preVetGeneralEducationItem]
			appContext.doctorAccountDetails!.preVetEducation = newPreVetEducation
			setPreVetEducationConfirmation({messageType: "saved"})
		} else {
			setPreVetEducationConfirmation({messageType: "problem"})
			return
		}
	} catch (error: unknown) {
		handle401AxiosErrorAndSetMessageType(error, setPreVetEducationConfirmation)
	}
}
