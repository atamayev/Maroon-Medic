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
			School_ID: listDetails.vetSchools.find(school => school.School_name === vetGeneralEducationItem.School_name)!.vet_school_listID,
			Education_type_ID: listDetails.vetEducationTypes.find(
				educationType => educationType.Education_type === vetGeneralEducationItem.Education_type)!.vet_education_typeID,
			Start_date: moment(vetGeneralEducationItem.Start_Date, "MMMM D, YYYY").format("YYYY-MM-DD"),
			End_date: moment(vetGeneralEducationItem.End_Date, "MMMM D, YYYY").format("YYYY-MM-DD")
		}
		const response = await PrivateDoctorDataService.addVetEducationData(mappedVetGeneralEducationItem)
		if (response.status === 200) {
			vetGeneralEducationItem.vet_education_mappingID = response.data
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
