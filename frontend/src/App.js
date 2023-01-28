import React, {useContext, useState, useEffect} from 'react';
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
import { AuthContext } from './Contexts/authContext';
import VetDataService from "./Services/vet-service"

export default function App() {
  const { currentUser } = useContext(AuthContext);
  const [results, setResults] = useState(null);

  useEffect(() => {
    findByName();
  }, []);
  
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
    {currentUser?(
      <div>
        logged in: {currentUser.DoctorID}
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
        {/* <Route exact path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}></Route> */}
          <Route exact path = '/register' element = {<Register/>} />
          <Route exact path = '/login' element = {<Login/>} />
          <Route exact path="/" element = {<HomeVetsList results={results}/>} />
          <Route exact path="/s/:query" element = {<SpecificVetsList/>} />
          <Route exact path = '/user/:id' element = {<Vet/>} />
          <Route exact path = '/new-vet' element = {<NewVet/>} />

          {/* Catch all */}
          <Route path = '*' element = {<Missing/>} />
        </Routes>
      </div>
    </Container>
    <Footer className = "align-items-center justify-content-center layout-container" />
</>
  );
}