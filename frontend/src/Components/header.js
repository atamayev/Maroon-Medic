
import React, {useCallback, useState, useEffect, useContext } from 'react'
import {Dropdown} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import logo from '../Images/logo.svg';
import pic from '../Images/ProfileImage.jpg';
import DataService from '../Services/data-service'
import { UUIDContext } from '../Contexts/UUIDContext.js';
import { VerifyContext } from '../Contexts/VerifyContext.js';
import { SearchContext } from '../Contexts/SearchContext';

export default function Header () {
  const location = useLocation();
  const [headerData, setHeaderData] = useState({});
  const {checkUUID} = useContext(UUIDContext);
  const {user_verification, DoctorVerifyToken, PatientVerifyToken} = useContext(VerifyContext);
  const {setSearchTerm, searchTerm} = useContext(SearchContext);

  useEffect(()=>{
    console.log('in header useEffect')
    user_verification()
    .then(result => {
      if (result === true) {
        return checkUUID();
      }
    })
    .then(checkUUIDResult => {
      if (checkUUIDResult === true) {
        console.log(`Used ${Header.name} useEffect`);
        const storedHeaderData = sessionStorage.getItem("headerData")
        if (storedHeaderData){
          setHeaderData(JSON.parse(storedHeaderData));
        }else{
          console.log('fetching data from db (elsed)')
          HeaderData();
        }
      } else {
        throw new Error("Result from checkUUID is false");
      }
    })
    .catch(error => {
      console.error(error);
    });
  }, []);
  
  async function HeaderData (){
    try{
      const response = await DataService.fillHeader() // need to change this to fill Header - and pass in type (doctor or patient)
      if (response){
        // console.log(response.data)
        setHeaderData(response.data);
        sessionStorage.setItem("headerData", JSON.stringify(response.data))
      }else{
        console.log('no response')
      }
    }catch(error){
      console.log('unable to fill in Header data', error)
    }
  }

  const handleLogout = async () => {
    try{
      sessionStorage.removeItem("dashboardData");
      sessionStorage.removeItem("headerData");
      await DataService.logout();
    } catch(error){
      console.log('error',error)
    }
    handleRefresh();
    console.log('logged out');
  }

  const handleRefresh = useCallback(() => {
    if (location.pathname === '/') {
        window.location.reload();
    } else {
        window.location.href = '/';
    }
  }, [location]);

  const handleKeyUp = (event) => {
    if (event.key === 'Enter'){
      const value = event.target.value
      console.log(`handleKeyUp in ${value}`, value)
      if (!value){
        console.log('searchName',value)
        sessionStorage.setItem("searchTerm", "")
        window.location.href = '/';
      }else{
        console.log('searchName',value)
        sessionStorage.setItem("searchTerm", value)
        window.location.href = `/s/${value}`;
      }
    }
  }

  const handleSearch = (value) => {
    console.log(value)
    if (!value){
      console.log('searchName',value)
      sessionStorage.setItem("searchTerm", "")
      window.location.href = '/';
    }else{
      console.log('searchName',value)
      setSearchTerm(value);
      window.location.href = `/s/${value}`;
    }
  };

  const handleHome = () => {
    sessionStorage.setItem("searchTerm", "")
    window.location.href = '/';
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <img 
            src = {logo} 
            alt = "Logo" 
            width= {50}
            height = {50} 
            onClick = {handleHome}
            style={{ cursor: "pointer" }} 
            />
        <div className="navbar-collapse" id="navbarSupportedContent">
        <input
            type="search"
            id = "search-input"
            className="form-control mr-sm-2"
            placeholder="Search"
            aria-label="Search"
            defaultValue={location.pathname !== '/' ? searchTerm : ''}
            onKeyUp={handleKeyUp}
          />
          <div className="input-group-append">
            <button
              className="btn btn-dark"
              type="button"
              onClick={()=>handleSearch(document.getElementById("search-input").value)}>
              Search
            </button>
          </div>
      <Dropdown className="menu-container" >
      <Dropdown.Toggle variant="dark" id="dropdown-basic" className = "menu-trigger menu-active">
        {DoctorVerifyToken || PatientVerifyToken ? (headerData.FirstName):'Profile'}
        <img src = {pic} 
        alt = "profile" 
        height = {20} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {DoctorVerifyToken ? (
          <div>
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          <Dropdown.Item href="/vet-dashboard">Vet Dashboard</Dropdown.Item>
          <Dropdown.Item href="/edit-vet-profile">Profile Settings</Dropdown.Item>
          </div>
          ) : PatientVerifyToken ? (
            <div>
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          <Dropdown.Item href="/patient-dashboard">Patient Dashboard</Dropdown.Item>
          <Dropdown.Item href="/edit-patient-profile">Profile Settings</Dropdown.Item>
            </div>
          ) : (
          <div>
          <Dropdown.Item href="/vet-register" className='fw-bold'>Vet Sign up</Dropdown.Item>
          <Dropdown.Item href="/vet-login">Vet Log In</Dropdown.Item>
          <Dropdown.Item href="/patient-register" className='fw-bold'>Patient Sign up</Dropdown.Item>
          <Dropdown.Item href="/patient-login">Patient Log In</Dropdown.Item>

          <Dropdown.Divider />
          <Dropdown.Item href="/help">Help</Dropdown.Item>
          </div>
          )
           }
      </Dropdown.Menu>
    </Dropdown>
        </div>
      </nav>
    </header>
  )
}
