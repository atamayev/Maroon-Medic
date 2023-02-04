
import React, {useCallback, useState, useEffect, useContext } from 'react'
import {Dropdown} from "react-bootstrap";
import {useLocation, Link} from "react-router-dom";

import logo from '../Images/logo.svg';
import pic from '../Images/ProfileImage.jpg';
import VetDataService from '../Services/vet-service'
import { UUIDContext } from '../Wraps/UUIDContext.js';
import { VerifyContext } from '../Wraps/VerifyContext.js';
import { SearchContext } from '../Wraps/SearchContext';

export default function Header () {
  // const [searchName, setSearchName ] = useState("");
  const location = useLocation();
  const [DoctorUUID, setDoctorUUID] = useState(null) 
  const [headerData, setHeaderData] = useState({});
  // const { DoctorUUID, checkDoctorUUID } = useContext(UUIDContext);
  const {verifyToken, user_verification} = useContext(VerifyContext)
  const cookie_monster = document.cookie;
  const {setSearchTerm} = useContext(SearchContext)

  useEffect(()=>{
    user_verification(cookie_monster);
    checkDoctorUUID();
    // console.log('verifyToken', verifyToken)
    // console.log('DoctorUUID',DoctorUUID)
    if (verifyToken == true && DoctorUUID){
      console.log('verify and uuid')
      HeaderData();
    }
  }, []);
  
  async function checkDoctorUUID(){
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
        await HeaderData()
      }
    }
    return null;
  }

  async function HeaderData (){
    if(cookie_monster){
         try{
            const response = await VetDataService.fillDashboard(cookie_monster)
            if (response){
              console.log(response.data)
              setHeaderData(response.data);
            }else{
              console.log('no response')
            }
          }catch(error){
            console.log('unable to fill in Header data', error)
          }
      }
    else{
      console.log('no cookies')
    }
  }

  const handleLogout = async () => {
    localStorage.clear();
    try{
      await VetDataService.logout();
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
      console.log('handlkey up in event.target.value', event.target.value)
      handleSearch(event.target.value);
    }
  }

  // const handleSearch = () => {
  //   if (!searchName){
  //     console.log('searchName',searchName)
  //     window.location.href = '/';
  //   }else{
  //     window.location.href = `/s/${searchName}`;
  //     // setTimeout(1000);
  //     onSearch(searchName);
  //   }
  // };
  const handleSearch = (event) => {
    console.log(event)
    setSearchTerm(event)
  };
 
  return (
    <header className = 'header'>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to = "/">
          <img 
            src = {logo} 
            alt = "Logo" 
            width= {50}
            height = {50} 
            />
          </Link>
        <div className="navbar-collapse" id="navbarSupportedContent">
        <input
            type="search"
            className="form-control mr-sm-2"
            placeholder="Search"
            aria-label="Search"
            onKeyUp={handleKeyUp}
          />
          <div className="input-group-append">
            <button
              className="btn btn-dark"
              type="button"
              onClick={handleSearch}>
              Search
            </button>
          </div>
      <Dropdown className="menu-container" >
      <Dropdown.Toggle variant="dark" id="dropdown-basic" className = "menu-trigger menu-active">
        {DoctorUUID ? (headerData.FirstName):'Profile'}
        <img src = {pic} 
        alt = "profile" 
        height = {20} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {DoctorUUID ? (
          <div>
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
          <Dropdown.Item href="/edit-vet-profile">Profile Settings</Dropdown.Item>
          </div>
        ):(
          <div>
          <Dropdown.Item href="/vet-register" className='fw-bold'>Sign up</Dropdown.Item>
          <Dropdown.Item href="/vet-login">Log In</Dropdown.Item>
          </div>
        )}
{/* 
        <Dropdown.Divider />
        <Dropdown.Item href="/about">About</Dropdown.Item>
        <Dropdown.Item href="/help">Help</Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>
        </div>
      </nav>
    </header>
  )
}
