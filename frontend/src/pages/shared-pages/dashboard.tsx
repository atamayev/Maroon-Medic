import PatientDashboard from "../patient-pages/patient-dashboard"
import DoctorDashboard from "../private-doctor-pages/doctor-dashboard"
import SharedPagesTemplate from "src/components/shared-pages-template"

export default function Dashboard() {
  return (
    <SharedPagesTemplate
      DoctorContent = {<DoctorDashboard/>}
      PatientContent = {<PatientDashboard/>}
    />
  )
}
