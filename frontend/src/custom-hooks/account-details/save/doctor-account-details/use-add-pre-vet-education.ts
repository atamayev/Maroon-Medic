/* eslint-disable @typescript-eslint/no-non-null-assertion */
import _ from "lodash"
import dayjs from "dayjs"
import { useContext } from "react"
import AppContext from "src/contexts/maroon-context"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"

export default function useAddPreVetEducation() : (
	preVetGeneralEducationItem: PreVetEducationItem,
	setPreVetEducationConfirmation: (conf: ConfirmationMessage) => void
) => Promise<void> {
	const appContext = useContext(AppContext)

	return async (
		preVetGeneralEducationItem: PreVetEducationItem,
		setPreVetEducationConfirmation: (conf: ConfirmationMessage) => void
	): Promise<void> => {
		try {
			if (
				_.isNull(appContext.privateDoctorData) ||
				_.isNull(appContext.privateDoctorData.doctorLists) ||
				_.isNull(appContext.privateDoctorData.doctorAccountDetails)
			) return
			const mappedPreVetGeneralEducationItem: PreVetEducationData = {
				schoolId: appContext.privateDoctorData.doctorLists.preVetSchools
					.find(school => school.schoolName === preVetGeneralEducationItem.schoolName)!.preVetSchoolListId,

				majorId: appContext.privateDoctorData.doctorLists.majors.find(
					major => major.majorName === preVetGeneralEducationItem.majorName)!.majorListId,

				educationTypeId: appContext.privateDoctorData.doctorLists.preVetEducationTypes.find(
					educationType => educationType.educationType === preVetGeneralEducationItem.educationType)!.preVetEducationTypeId,

				startDate: dayjs(preVetGeneralEducationItem.startDate, "MMMM D, YYYY").format("YYYY-MM-DD"),
				endDate: dayjs(preVetGeneralEducationItem.endDate, "MMMM D, YYYY").format("YYYY-MM-DD")
			}
			const response = await PrivateDoctorDataService.addPreVetEducationData(mappedPreVetGeneralEducationItem)
			if (response.status === 200 && typeof response.data === "number") {
				preVetGeneralEducationItem.preVetEducationMappingId = response.data
				const newPreVetEducation = [
					...appContext.privateDoctorData.doctorAccountDetails.preVetEducation, preVetGeneralEducationItem
				]
				appContext.privateDoctorData.doctorAccountDetails.preVetEducation = newPreVetEducation
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
