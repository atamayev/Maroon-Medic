import DoctorSettingsCards from "../private-doctor-pages/doctor-settings/doctor-settings-cards"
import PatientSettingsCards from "../patient-pages/patient-settings/patient-settings-cards"
import SharedPagesTemplate from "src/components/shared-pages-template"

export default function SettingsCards() {
  return (
    <SharedPagesTemplate
      DoctorContent = {<DoctorSettingsCards/>}
      PatientContent = {<PatientSettingsCards/>}
    />
  )
}
