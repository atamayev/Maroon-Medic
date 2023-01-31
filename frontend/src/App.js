import React, {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap';
import "./CSS/footer.css"
import HomeVetsList from "./Components/home-vets-list"
import SpecificVetsList from "./Components/specific-vets-list"
import Header from './Components/header';
import Footer from './Components/footer';
import Register from "./Components/register";
import Login from "./Components/login";
import Vet from './Components/vet';
import Missing from './Components/missing';
import NewVet from './Components/new-vet';
import VetDataService from "./Services/vet-service"
import Dashboard from './Components/dashboard';
import EditProfile from './Components/edit-profile';
import Test from './Components/test';

export default function App() {
  const [UUID, setUUID] = useState(null)   
  const [results, setResults] = useState(null);

  useEffect(() => {
    findByName();
    checkUUID()
  }, []);

  function checkUUID(){
    const cookieName = "UUID=";
    const decodedCookie = document.cookie; // when https, will need to decode
    const cookies = decodedCookie.split(";");
    for(let i = 0; i <cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.startsWith(cookieName)) {
        setUUID(cookie.substring(cookieName.length, cookie.length));
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
    {UUID?(
      <div>
        logged in: {UUID}
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
          <Route exact path = '/testing' element = {<Test/>} />

          {/* Don't need the search header: */}
          <Route exact path = '/register' element = {<Register/>} />
          <Route exact path = '/login' element = {<Login/>} />
          <Route exact path = '/new-vet' element = {<NewVet/>} />
          <Route exact path = '/dashboard' element = {<Dashboard/>} />
          <Route exact path = '/edit-profile' element = {<EditProfile/>} />

          {/* Catch all */}
          <Route path = '*' element = {<Missing/>} />
        </Routes>
      </div>
    </Container>
    <Footer className = "align-items-center justify-content-center layout-container" />
</>
  );
}
