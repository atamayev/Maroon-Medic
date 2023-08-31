import PatientAccountDetails from "../patient-pages/patient-account-details/patient-account-details"
import DoctorAccountDetails from "../private-doctor-pages/doctor-account-details/doctor-account-details"
import SharedPagesTemplate from "src/components/shared-pages-template"

export default function AccountDetails() {
	return (
		<SharedPagesTemplate
			doctorContent = {<DoctorAccountDetails/>}
			patientContent = {<PatientAccountDetails/>}
		/>
	)
}
