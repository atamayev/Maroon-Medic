import React, {useCallback, useState, useEffect, useContext } from 'react'
import {Dropdown} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import logo from '../Images/logo.svg';
import pic from '../Images/ProfileImage.jpg';
import DataService from '../Services/data-service'
import { VerifyContext } from '../Contexts/VerifyContext.js';
import { SearchContext } from '../Contexts/SearchContext';

export default function Header () {
  const location = useLocation();
  const [headerData, setHeaderData] = useState('');
  const {user_verification, DoctorVerifyToken, PatientVerifyToken} = useContext(VerifyContext);
  const {searchTerm, setSearchTerm} = useContext(SearchContext);
  const cookie_monster = document.cookie;

  useEffect(()=>{
    console.log('in header useEffect')
    if (location.pathname !== '/new-vet' && location.pathname !== '/new-patient'){
      user_verification()
      .then(result => {
        if (result === true) {
          setTimeout(()=>{//slightly inefficient way of doing it, but this pauses the headerData, allowing the dashboarddata to run it's query, and then populates the headerData 50 miliseconds later
            // this is done in order to not query the DB twice (once for dashboardData, and once for headerData).
            try{
              const name = JSON.parse(sessionStorage.getItem("DoctorPersonalInfo")).FirstName;
              setHeaderData(name);
            }catch(error){
              if (error instanceof TypeError){
                console.log()
                PersonalInfo();
              }
              else{
                console.log('some other error')
              }
            }
           }, 50)
        }
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, [cookie_monster]);

  async function PersonalInfo (){
    try{
      const response = await DataService.fillDoctorPersonalData()
      if (response){
        setHeaderData(response.data.FirstName);
        sessionStorage.setItem("DoctorPersonalInfo", JSON.stringify(response.data))
      }else{
        console.log('no response')
      }
    }catch(error){
      console.log('unable to fillDoctorPersonalData', error)
    }
  }

  const handleLogout = async () => {
    try{
      sessionStorage.removeItem("dashboardData");
      sessionStorage.removeItem("DoctorPersonalInfo");
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
        {DoctorVerifyToken || PatientVerifyToken ? (headerData):'Profile'}
        <img src = {pic} 
        alt = "profile" 
        height = {20} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {DoctorVerifyToken ? (
          <div>
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          <Dropdown.Item href="/vet-dashboard">Vet Dashboard</Dropdown.Item>
          <Dropdown.Item href="/vet-account-details">Account Settings</Dropdown.Item>
          </div>
          ) : PatientVerifyToken ? (
            <div>
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          <Dropdown.Item href="/patient-dashboard">Patient Dashboard</Dropdown.Item>
          <Dropdown.Item href="/patient-account-details">Account Settings</Dropdown.Item>
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
