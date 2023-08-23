import { Routes, Route } from "react-router-dom"
//Publicly accessible:
import HomeDoctorsList from "./components/doctors-search-list/home-doctors-list"
import SpecificDoctorsList from "./components/doctors-search-list/specific-doctors-list"
import Doctor from "./pages/public-doctor-pages/doctor"
import Footer from "./components/footer/footer"
import Missing from "./pages/missing"
import FinalizeBookingPage from "./pages/public-doctor-pages/finalize-booking"
import Help from "./pages/help"

//Vet Specific:
import DoctorRegister from "./pages/private-doctor-pages/doctor-register"
import DoctorLogin from "./pages/private-doctor-pages/doctor-login"
import NewDoctor from "./pages/private-doctor-pages/new-doctor"
import DoctorCalendar from "./pages/private-doctor-pages/calendar"

//Patient Specific:
import PatientLogin from "./pages/patient-pages/patient-login"
import PatientRegister from "./pages/patient-pages/patient-register"
import NewPatient from "./pages/patient-pages/new-patient"
import MyPets from "./pages/patient-pages/my-pets/my-pets"

//Shared Components:
import Dashboard from "./pages/shared-pages/dashboard"
import AccountDetails from "./pages/shared-pages/account-details"
import SettingsCards from "./pages/shared-pages/settings-cards"
import PersonalInfo from "./pages/shared-pages/personal-info"
import Privacy from "./pages/shared-pages/privacy"
import LoginAndSecurity from "./pages/shared-pages/login-and-security"

export default function App() {
  return (
    <>
      <div className="flex min-h-screen justify-center">
        <div className = "w-5/6" style = {{maxWidth: "4000px"}}>
          <Routes>
            <Route path = "/" element = {<HomeDoctorsList/>} />
            <Route path = "/s/:query" element = {<SpecificDoctorsList/>} />
            <Route path = "/s/" element = {<SpecificDoctorsList/>} />
            <Route path = "/vet/:id" element = {<Doctor/>} />
            <Route path = "/finalize-booking" element = {<FinalizeBookingPage/>}/>

            <Route path = "/dashboard" element = {<Dashboard/>} />
            <Route path = "/account-details" element = {<AccountDetails/>} />
            <Route path = "/settings" element = {<SettingsCards/>} />
            <Route path = "/settings/personal-information" element = {<PersonalInfo/>} />
            <Route path = "/settings/privacy" element = {<Privacy/>} />
            <Route path = "/settings/login-and-security" element = {<LoginAndSecurity/>} />

            <Route path = "/vet-register" element = {<DoctorRegister/>} />
            <Route path = "/vet-login" element = {<DoctorLogin/>} />
            <Route path = "/new-vet" element = {<NewDoctor/>} />
            <Route path = "/calendar" element = {<DoctorCalendar/>} />

            <Route path = "/patient-register" element = {<PatientRegister/>} />
            <Route path = "/patient-login" element = {<PatientLogin/>} />
            <Route path = "/new-patient" element = {<NewPatient/>} />
            <Route path = "/my-pets" element = {<MyPets/>} />

            <Route path = "/help" element = {<Help/>} />
            {/* Catch all */}
            <Route path = "*" element = {<Missing/>} />
          </Routes>

        </div>
      </div>
      <Footer />
    </>
  )
}
