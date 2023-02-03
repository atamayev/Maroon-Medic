import React, {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap';
import "./CSS/footer.css"
import VetDataService from "./Services/vet-service"
//Publicly accessible:
import Header from './Components/header';
import HomeVetsList from "./Components/home-vets-list"
import SpecificVetsList from "./Components/specific-vets-list"
import Vet from './Components/vet';
import Footer from './Components/footer';
import Missing from './Components/missing';
//Vet Specific:
import VetRegister from "./Components/Vet/vet-register"
import VetLogin from "./Components/Vet/vet-login"
import NewVet from "./Components/Vet/new-vet"
import Dashboard from "./Components/Vet/dashboard"
import EditVetProfile from "./Components/Vet/edit-vet-profile"

export default function App() {
  const [DoctorUUID, setDoctorUUID] = useState(null)   
  const [results, setResults] = useState(null);

  useEffect(() => {
    findByName();
    checkDoctorUUID()
  }, []);

  function checkDoctorUUID(){
    const cookieName = "DoctorUUID=";
    const decodedCookie = document.cookie; // when https, will need to decode
    const cookies = decodedCookie.split(";");
    for(let i = 0; i <cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.startsWith(cookieName)) {
        setDoctorUUID(cookie.substring(cookieName.length, cookie.length));
      }
    }
    return null;
  }
  
  // this is the core search function
  async function findByName (query) {
    console.log('query', query)
    if (!query){
      query = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }
    try{
      const response = await VetDataService.find(query)
      setResults(response.data); // Sets the data state to the response (all vets)
    }catch(error){
      console.error(error);
    }
  };

  return (
    <>
    {DoctorUUID?(
      <div>
        logged in: {DoctorUUID}
      </div>
    ):(
    <div>
      logged out
    </div>
    )}
     <Container className = "d-flex" style = {{minHeight: "100vh"}}>
     <div className="w-100" style = {{maxWidth: "4000px"}}>
      <Header className = "d-flex align-items-center justify-content-center w-100" onSearch={findByName} />
        <Routes>
          <Route exact path="/" element = {<HomeVetsList results={results}/>} />
          <Route exact path="/s/:query" element = {<SpecificVetsList/>} />
          <Route exact path = '/user/:id' element = {<Vet/>} />

          {/* Don't need the search header: */}
          <Route exact path = '/vet-register' element = {<VetRegister/>} />
          <Route exact path = '/vet-login' element = {<VetLogin/>} />
          <Route exact path = '/new-vet' element = {<NewVet/>} />
          <Route exact path = '/dashboard' element = {<Dashboard/>} />
          <Route exact path = '/edit-vet-profile' element = {<EditVetProfile/>} />

          {/* Catch all */}
          <Route path = '*' element = {<Missing/>} />
        </Routes>
      </div>
    </Container>
    <Footer className = "align-items-center justify-content-center layout-container" />
</>
  );
}
