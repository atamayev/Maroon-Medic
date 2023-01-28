
import React, {useContext, useCallback, useState } from 'react'
import Dropdown from "react-bootstrap/Dropdown";
import {useLocation, Link} from "react-router-dom";

import logo from '../Images/logo.svg';
import pic from '../Images/ProfileImage.jpg';
import { AuthContext } from '../Contexts/authContext';
import VetDataService from '../Services/vet-service'

export default function Header ( {onSearch}) {
  const { currentUser } = useContext(AuthContext);
  const [searchName, setSearchName ] = useState("");
  const location = useLocation();

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

  const handleKeyUp = (e) => {
    if (e.key === 'Enter'){
      handleSearch(searchName);
    }
  }

  const handleSearch = () => {
    if (!searchName){
      console.log('searchName',searchName)
      window.location.href = '/';
    }else{
      window.location.href = `/s/${searchName}`;
      // setTimeout(1000);
      onSearch(searchName);
    }
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
            value={searchName}
            onChange={ e => setSearchName(e.target.value)}
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
        {currentUser ? (currentUser):'Profile'}
        <img src = {pic} 
        alt = "profile" 
        height = {20} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {currentUser ? (
          <div>
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </div>
        ):(
          <div>
          <Dropdown.Item href="/register" className='fw-bold'>Sign up</Dropdown.Item>
          <Dropdown.Item href="/login">Log In</Dropdown.Item>
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
