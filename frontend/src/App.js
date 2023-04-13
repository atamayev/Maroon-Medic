import React from 'react';
import {Routes, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap';
import "./CSS/footer.css"
//Publicly accessible:
import Header from './Pages/header';
import HomeDoctorsList from "./Pages/home-doctors-list"
import SpecificDoctorsList from "./Pages/specific-doctors-list"
import Doctor from './Pages/doctor';
import Footer from './Pages/footer';
import Missing from './Pages/missing';
//Vet Specific:
import DoctorRegister from "./Pages/Doctor/doctor-register"
import DoctorLogin from "./Pages/Doctor/doctor-login"
import NewDoctor from "./Pages/Doctor/new-doctor"
import DoctorDashboard from './Pages/Doctor/doctor-dashboard';
import DoctorAccountDetails from "./Pages/Doctor/doctor-account-details"
import DoctorSettings from './Pages/Doctor/DoctorSettings/doctor-settings';
import DoctorPersonalInfo from './Pages/Doctor/DoctorSettings/doctor-personal-info';
import DoctorPrivacy from './Pages/Doctor/DoctorSettings/doctor-privacy';
import DoctorLoginAndSecurity from './Pages/Doctor/DoctorSettings/doctor-login-and-security';

//Patient Specific:
import PatientLogin from './Pages/Patient/patient-login';
import PatientRegister from './Pages/Patient/patient-register';
import PatientDashboard from "./Pages/Patient/patient-dashboard"
import NewPatient from './Pages/Patient/new-patient';

export default function App() {

  return (
    <>
     <Container className = "d-flex" style = {{minHeight: "100vh"}}>
     <div className="w-100" style = {{maxWidth: "4000px"}}>
     <Header className = "d-flex align-items-center justify-content-center w-100"/>
        <Routes>
          <Route exact path="/" element = {<HomeDoctorsList/>} />
          {/* Specific Doctrs List both for if there is a query, and if there isnt: next line */}
          <Route exact path="/s/:query" element = {<SpecificDoctorsList/>} /> 
          <Route exact path="/s/" element = {<SpecificDoctorsList/>} />
          <Route exact path = '/vet/:id' element = {<Doctor/>} />

          {/* Don't need the search header: */}
          <Route exact path = '/vet-register' element = {<DoctorRegister/>} />
          <Route exact path = '/vet-login' element = {<DoctorLogin/>} />
          <Route exact path = '/new-vet' element = {<NewDoctor/>} />
          <Route exact path = '/vet-dashboard' element = {<DoctorDashboard/>} />
          <Route exact path = '/vet-account-details' element = {<DoctorAccountDetails/>} />
          <Route exact path = '/vet-settings' element = {<DoctorSettings/>} />
          <Route exact path = '/vet-settings/personal-information' element = {<DoctorPersonalInfo/>} />
          <Route exact path = '/vet-settings/privacy' element = {<DoctorPrivacy/>} />
          <Route exact path = '/vet-settings/login-and-security' element = {<DoctorLoginAndSecurity/>} />

          <Route exact path = '/patient-register' element = {<PatientRegister/>} />
          <Route exact path = '/patient-login' element = {<PatientLogin/>} />
          <Route exact path = '/new-patient' element = {<NewPatient/>} />
          <Route exact path = '/patient-dashboard' element = {<PatientDashboard/>} />

          {/* Catch all */}
          <Route path = '*' element = {<Missing/>} />
        </Routes>
     
      </div>
    </Container>
    <Footer className = "align-items-center justify-content-center layout-container" />
</>
  );
}
