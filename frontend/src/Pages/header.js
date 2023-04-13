import React, {useCallback, useState, useEffect, useContext } from 'react'
import {Dropdown} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import logo from '../Images/logo.svg';
import pic from '../Images/ProfileImage.jpg';
import DataService from '../Services/data-service'
import PrivateDoctorDataService from '../Services/private-doctor-data-service'
import { VerifyContext } from '../Contexts/VerifyContext.js';
import { SearchContext } from '../Contexts/SearchContext';

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

const handleSearch = (value, setSearchTerm) => {
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

export default function Header (props) {
  const location = useLocation();
  const [headerData, setHeaderData] = useState('');
  const {user_verification} = useContext(VerifyContext);
  const [user_type, setUser_type] = useState(null);
  const {searchTerm, setSearchTerm} = useContext(SearchContext);
  const cookie_monster = document.cookie;

  useEffect(()=>{
    console.log('in header useEffect')
    if (location.pathname !== '/new-vet' && location.pathname !== '/new-patient'){
      try{
        const name = JSON.parse(sessionStorage.getItem("DoctorPersonalInfo")).FirstName;
        setUser_type('Doctor')
        setHeaderData(name);
        return;
      }catch(error){
        // console.log(error)
      }
      try{
        const name = JSON.parse(sessionStorage.getItem("PatientPersonalInfo")).FirstName;
        setUser_type('Patient')
        setHeaderData(name);
        return;
      }catch(error){
        // console.log(error)
      }
  
      //sets the headerData when login/register:
      if (!headerData){
        console.log('no header data')
        user_verification()
        .then(result => {
          if (result.verified === true) {
            setUser_type(result.user_type)
            try{
              const name = JSON.parse(sessionStorage.getItem(`${result.user_type}PersonalInfo`)).FirstName;
              setHeaderData(name);
            }catch(error){
              if (error instanceof TypeError){
                PersonalInfo(result.user_type);
              }
              else{
                console.log('some other error')
              }
            } 
          }
        })
        .catch(error => {
          console.error(error);
        });
      }
    }
  }, [cookie_monster]);

  async function PersonalInfo (type){
    let response;
    if (type === 'Doctor'){
      try{
        response = await PrivateDoctorDataService.fillPersonalData();
      }catch(error){
        console.log(`unable to fillDoctorPersonalData`, error)
      }
    }else if (type === 'Patient'){
      try{
        response = await DataService.fillPatientPersonalData();
      }catch(error){
        console.log(`unable to fillPatientPersonalData`, error)
      }
    }else{
      console.log('no Type:', type)
    }

    if (response){
      setHeaderData(response.data.FirstName);
      sessionStorage.setItem(`${type}PersonalInfo`, JSON.stringify(response.data))
    }else{
      console.log('no response')
    }
  }; 
  
  const handleLogout = async () => {
    try{
      sessionStorage.clear();
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


  const renderDropdown = ()=>{
    if(props.dropdown === true){
      if(user_type === 'Doctor'){
        return(
          <div>
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            <Dropdown.Item href="/vet-dashboard">Vet Dashboard</Dropdown.Item>
            <Dropdown.Item href="/vet-account-details">Account Details</Dropdown.Item>
          </div>
        )
      }
      else if (user_type === 'Patient'){
        return(
          <div>
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            <Dropdown.Item href="/patient-dashboard">Patient Dashboard</Dropdown.Item>
            <Dropdown.Item href="/patient-account-details">Account Settings</Dropdown.Item>
          </div>
        )
      }
      else{
        return(
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
    }
  }

  const renderSearch = ()=>{
    if(props.search === true){
      return(
        <>
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
              onClick={()=>handleSearch(document.getElementById("search-input").value, setSearchTerm)}>
              Search
            </button>
          </div>
        </>
      )
    }
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
          {renderSearch()}
      <Dropdown className="menu-container" >
      <Dropdown.Toggle variant="dark" id="dropdown-basic" className = "menu-trigger menu-active">
        {headerData ? (headerData):'Profile'}
        <img src = {pic}
        alt = "profile" 
        height = {20} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {renderDropdown()}
      </Dropdown.Menu>
    </Dropdown>
        </div>
      </nav>
    </header>
  )
}
