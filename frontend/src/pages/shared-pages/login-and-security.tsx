import PatientLoginAndSecurity from "../patient-pages/patient-settings/patient-login-and-security"
import DoctorLoginAndSecurity from "../private-doctor-pages/doctor-settings/doctor-login-and-security"
import SharedPagesTemplate from "src/components/shared-pages-template"

export default function LoginAndSecurity() {
	return (
		<SharedPagesTemplate
			DoctorContent = {<DoctorLoginAndSecurity/>}
			PatientContent = {<PatientLoginAndSecurity/>}
		/>
	)
}
