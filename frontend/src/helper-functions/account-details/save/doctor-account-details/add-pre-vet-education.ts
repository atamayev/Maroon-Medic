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
        .find(school => school.School_name === preVetGeneralEducationItem.School_name)!.pre_vet_school_listID,
      Major_ID: listDetails.majors.find(major => major.Major_name === preVetGeneralEducationItem.Major_name)!.major_listID,
      Education_type_ID: listDetails.preVetEducationTypes.find(
        educationType => educationType.Education_type === preVetGeneralEducationItem.Education_type)!.pre_vet_education_typeID,
      Start_date: moment(preVetGeneralEducationItem.Start_Date, "MMMM D, YYYY").format("YYYY-MM-DD"),
      End_date: moment(preVetGeneralEducationItem.End_Date, "MMMM D, YYYY").format("YYYY-MM-DD")
    }
    const response = await PrivateDoctorDataService.addPreVetEducationData(mappedPreVetGeneralEducationItem)
    if (response.status === 200) {
      preVetGeneralEducationItem.pre_vet_education_mappingID = response.data
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
