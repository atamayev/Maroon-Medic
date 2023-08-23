import DoctorPrivacy from "../private-doctor-pages/doctor-settings/doctor-privacy"
import PatientPrivacy from "../patient-pages/patient-settings/patient-privacy"
import SharedPagesTemplate from "src/components/shared-pages-template"

export default function Privacy() {
  return (
    <SharedPagesTemplate
      DoctorContent = {<DoctorPrivacy/>}
      PatientContent = {<PatientPrivacy/>}
    />
  )
}
