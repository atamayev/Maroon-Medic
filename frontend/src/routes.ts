/* eslint-disable max-len */
//Publicly accessible:
import HomeDoctorsList from "./components/doctors-search-list/home-doctors-list"
import SpecificDoctorsList from "./components/doctors-search-list/specific-doctors-list"
import Doctor from "./pages/public-doctor-pages/doctor"
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

const showAll = {showHeader: true, dropdown: true, search: true}

const routes = [
	{ path: "/", component: HomeDoctorsList, ...showAll },
	{ path: "/s/:query", component: SpecificDoctorsList, ...showAll },
	{ path: "/s/", component: SpecificDoctorsList, ...showAll },
	{ path: "/vet/:id", component: Doctor, ...showAll },
	{ path: "/finalize-booking", component: FinalizeBookingPage, ...showAll },

	{ path: "/dashboard", component: Dashboard, ...showAll },
	{ path: "/account-details", component: AccountDetails, ...showAll },
	{ path: "/settings", component: SettingsCards, ...showAll },
	{ path: "/settings/personal-information", component: PersonalInfo, ...showAll },
	{ path: "/settings/privacy", component: Privacy, ...showAll },
	{ path: "/settings/login-and-security", component: LoginAndSecurity, ...showAll },

	{ path: "/vet-register", component: DoctorRegister, ...showAll },
	{ path: "/vet-login", component: DoctorLogin, ...showAll },
	{ path: "/new-vet", component: NewDoctor, showHeader: true, dropdown: false, search: false },
	{ path: "/calendar", component: DoctorCalendar, ...showAll },

	{ path: "/patient-register", component: PatientRegister, ...showAll },
	{ path: "/patient-login", component: PatientLogin, ...showAll },
	{ path: "/new-patient", component: NewPatient, showHeader: true, dropdown: false, search: false },
	{ path: "/my-pets", component: MyPets, ...showAll },

	{ path: "/help", component: Help, ...showAll },
	{ path: "*", component: Missing, ...showAll }
]

export default routes
