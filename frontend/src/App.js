import React from 'react';
import {Routes, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap';
import "./CSS/footer.css"
//Publicly accessible:
import Header from './Components/header';
import HomeDoctorsList from "./Components/home-doctors-list"
import SpecificDoctorsList from "./Components/specific-doctors-list"
import Doctor from './Components/doctor';
import Footer from './Components/footer';
import Missing from './Components/missing';
//Vet Specific:
import DoctorRegister from "./Components/Doctor/doctor-register"
import DoctorLogin from "./Components/Doctor/doctor-login"
import NewDoctor from "./Components/Doctor/new-doctor"
import Dashboard from "./Components/Doctor/dashboard"
import EditDoctorProfile from "./Components/Doctor/edit-doctor-profile"
//Patient Specific:
import PatientLogin from './Components/Patient/patient-login';
import PatientRegister from './Components/Patient/patient-register';

export default function App() {

  return (
    <>
     <Container className = "d-flex" style = {{minHeight: "100vh"}}>
     <div className="w-100" style = {{maxWidth: "4000px"}}>
     <Header className = "d-flex align-items-center justify-content-center w-100"/>
        <Routes>
          <Route exact path="/" element = {<HomeDoctorsList/>} />
          <Route exact path="/s/:query" element = {<SpecificDoctorsList/>} />
          <Route exact path = '/vet/:id' element = {<Doctor/>} />

          {/* Don't need the search header: */}
          <Route exact path = '/vet-register' element = {<DoctorRegister/>} />
          <Route exact path = '/vet-login' element = {<DoctorLogin/>} />
          <Route exact path = '/new-vet' element = {<NewDoctor/>} />
          <Route exact path = '/dashboard' element = {<Dashboard/>} />
          <Route exact path = '/edit-vet-profile' element = {<EditDoctorProfile/>} />
          <Route exact path = '/patient-register' element = {<PatientRegister/>} />
          <Route exact path = '/patient-login' element = {<PatientLogin/>} />
          {/* Catch all */}
          <Route path = '*' element = {<Missing/>} />
        </Routes>
     
      </div>
    </Container>
    <Footer className = "align-items-center justify-content-center layout-container" />
</>
  );
}
