import {Routes, Route} from "react-router-dom"
import {Container} from "react-bootstrap"
//Publicly accessible:
import HomeDoctorsList from "./pages/home-doctors-list"
import SpecificDoctorsList from "./pages/specific-doctors-list"
import Doctor from "./pages/public-doctor-pages/doctor"
import Footer from "./pages/footer"
import Missing from "./pages/missing"
import { FinalizeBookingPage } from "./pages/public-doctor-pages/finalize-booking"

//Vet Specific:
import DoctorRegister from "./pages/private-doctor-pages/doctor-register"
import DoctorLogin from "./pages/private-doctor-pages/doctor-login"
import NewDoctor from "./pages/private-doctor-pages/new-doctor"
import DoctorDashboard from "./pages/private-doctor-pages/doctor-dashboard"
import DoctorAccountDetails from "./pages/private-doctor-pages/doctor-account-details/doctor-account-details"
import DoctorSettingsCards from "./pages/private-doctor-pages/doctor-settings/doctor-settings-cards"
import DoctorPersonalInfo from "./pages/private-doctor-pages/doctor-settings/doctor-personal-info"
import DoctorPrivacy from "./pages/private-doctor-pages/doctor-settings/doctor-privacy"
import DoctorLoginAndSecurity from "./pages/private-doctor-pages/doctor-settings/doctor-login-and-security"
import DoctorCalendar from "./pages/private-doctor-pages/calendar"

//Patient Specific:
import PatientLogin from "./pages/patient-pages/patient-login"
import PatientRegister from "./pages/patient-pages/patient-register"
import NewPatient from "./pages/patient-pages/new-patient"
import PatientDashboard from "./pages/patient-pages/patient-dashboard"
import MyPets from "./pages/patient-pages/my-pets/my-pets"
import PatientAccountDetails from "./pages/patient-pages/patient-account-details/patient-account-details"
import PatientSettingsCards from "./pages/patient-pages/patient-settings/patient-settings-cards"
import PatientPersonalInfo from "./pages/patient-pages/patient-settings/patient-personal-info"
import PatientPrivacy from "./pages/patient-pages/patient-settings/patient-privacy"
import PatientLoginAndSecurity from "./pages/patient-pages/patient-settings/patient-login-and-security"

export default function App() {
  return (
    <>
      <Container className = "d-flex" style = {{minHeight: "100vh"}}>
        <div className = "w-100" style = {{maxWidth: "4000px"}}>
          <Routes>
            <Route path = "/" element = {<HomeDoctorsList/>} />
            <Route path = "/s/:query" element = {<SpecificDoctorsList/>} />
            <Route path = "/s/" element = {<SpecificDoctorsList/>} />
            <Route path = "/vet/:id" element = {<Doctor/>} />
            <Route path = "/finalize-booking" element = {<FinalizeBookingPage/>}/>

            <Route path = "/vet-register" element = {<DoctorRegister/>} />
            <Route path = "/vet-login" element = {<DoctorLogin/>} />
            <Route path = "/new-vet" element = {<NewDoctor/>} />
            <Route path = "/vet-dashboard" element = {<DoctorDashboard/>} />
            <Route path = "/vet-account-details" element = {<DoctorAccountDetails/>} />
            <Route path = "/vet-settings" element = {<DoctorSettingsCards/>} />
            <Route path = "/vet-settings/personal-information" element = {<DoctorPersonalInfo/>} />
            <Route path = "/vet-settings/privacy" element = {<DoctorPrivacy/>} />
            <Route path = "/vet-settings/login-and-security" element = {<DoctorLoginAndSecurity/>} />
            <Route path = "/vet-calendar" element = {<DoctorCalendar/>} />

            <Route path = "/patient-register" element = {<PatientRegister/>} />
            <Route path = "/patient-login" element = {<PatientLogin/>} />
            <Route path = "/new-patient" element = {<NewPatient/>} />
            <Route path = "/patient-dashboard" element = {<PatientDashboard/>} />
            <Route path = "/my-pets" element = {<MyPets/>} />
            <Route path = "/patient-account-details" element = {<PatientAccountDetails/>} />
            <Route path = "/patient-settings" element = {<PatientSettingsCards/>} />
            <Route path = "/patient-settings/personal-information" element = {<PatientPersonalInfo/>} />
            <Route path = "/patient-settings/privacy" element = {<PatientPrivacy/>} />
            <Route path = "/patient-settings/login-and-security" element = {<PatientLoginAndSecurity/>} />

            {/* Catch all */}
            <Route path = "*" element = {<Missing/>} />
          </Routes>

        </div>
      </Container>
      <Footer />
    </>
  )
}
