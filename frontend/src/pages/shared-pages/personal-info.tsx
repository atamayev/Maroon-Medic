import DoctorPersonalInfo from "../private-doctor-pages/doctor-settings/doctor-personal-info"
import PatientPersonalInfo from "../patient-pages/patient-settings/patient-personal-info"
import SharedPagesTemplate from "src/components/shared-pages-template"

export default function PersonalInfo() {
	return (
		<SharedPagesTemplate
			doctorContent = {<DoctorPersonalInfo/>}
			patientContent = {<PatientPersonalInfo/>}
		/>
	)
}
