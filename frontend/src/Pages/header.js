import React, {useCallback, useState, useEffect, useContext } from 'react'
import {Dropdown} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import logo from "../images/logo.svg"
import pic from '../images/ProfileImage.jpg';
import { SearchContext } from '../contexts/search-context';
import AuthDataService from '../services/auth-data-service';  
import { VerifyContext } from '../contexts/verify-context.js';
import PrivatePatientDataService from '../services/private-patient-data-service';
import PrivateDoctorDataService from '../services/private-doctor-data-service'
import { invalidUserAction } from '../custom-hooks/user-verification-snippets';

const handleKeyUp = (event) => {
  if (event.key === 'Enter') {
    const value = event.target.value
    if (!value) {
      sessionStorage.setItem("searchTerm", "")
      window.location.href = '/';
    } else {
      sessionStorage.setItem("searchTerm", value)
      window.location.href = `/s/${value}`;
    }
  }
}

const handleSearch = (value, setSearchTerm) => {
  if (!value) {
    sessionStorage.setItem("searchTerm", "")
    window.location.href = '/';
  } else {
    setSearchTerm(value);
    window.location.href = `/s/${value}`;
  }
};

const handleHome = () => {
  sessionStorage.setItem("searchTerm", "")
  window.location.href = '/';
}

export default function Header (props) {
  const {dropdown, search} = props;
  const location = useLocation();
  const [headerData, setHeaderData] = useState('');
  const {user_verification} = useContext(VerifyContext);
  const [user_type, setUser_type] = useState(null);
  const {searchTerm, setSearchTerm} = useContext(SearchContext);
  const cookie_monster = document.cookie;

  const verifyAndSetHeaderData = async () => {
    const result = await user_verification();
    if (result.verified === true) {
        setUser_type(result.user_type)
        try {
            let name;
            if (result.user_type === 'Doctor') {
                name = JSON.parse(sessionStorage.getItem(`DoctorPersonalInfo`)).LastName;
                setHeaderData('Dr. ' + name);
            } else {
                name = JSON.parse(sessionStorage.getItem(`PatientPersonalInfo`)).FirstName;
                setHeaderData(name);
            }
        } catch (error) {
            if (error instanceof TypeError) fetchPersonalInfo(result.user_type);
        }
    }
  }

  const retrieveNameFromStorage = () => {
    try {
      const name = JSON.parse(sessionStorage.getItem("DoctorPersonalInfo")).LastName;
      setUser_type('Doctor')
      setHeaderData('Dr. '+ name);
      return;
    } catch(error) {
    }
    try {
      const name = JSON.parse(sessionStorage.getItem("PatientPersonalInfo")).FirstName;
      setUser_type('Patient')
      setHeaderData(name);
      return;
    } catch(error) {
    }
  }

  useEffect(() => {
    if (location.pathname !== '/new-vet' && location.pathname !== '/new-patient') {
      retrieveNameFromStorage()

      //sets the headerData when login/register:
      if (!headerData) verifyAndSetHeaderData()
    }
  }, [cookie_monster]);

  async function fetchPersonalInfo (type) {
    let response;
    if (type === 'Doctor') {
      try {
        response = await PrivateDoctorDataService.fillPersonalData();
      } catch (error) {
        if (error.response.status === 401) invalidUserAction(error.response.data)
      }
     }
     else if (type === 'Patient') {
      try {
        response = await PrivatePatientDataService.fillPersonalData();
      } catch (error) {
        if (error.response.status === 401) invalidUserAction(error.response.data)
      }
    }

    if (response) {
      setHeaderData(response.data.FirstName);
      sessionStorage.setItem(`${type}PersonalInfo`, JSON.stringify(response.data))
    }
  }; 
  
  const handleLogout = async () => {
    try {
      const response = await AuthDataService.logout();
      if (response.status === 200) sessionStorage.clear();
    } catch(error) {
    }
    handleRefresh();
  }
  
  const handleRefresh = useCallback(() => {
    if (location.pathname === '/') window.location.reload();
    else window.location.href = '/';
  }, [location]);

  const renderHeaderData = () => {
    if (headerData) return headerData
    return "Profile"
  }

  const renderDropdown = () => {
    if (dropdown === true) {
      return (
        <Dropdown className="menu-container">
          <Dropdown.Toggle
            variant="dark"
            id="dropdown-basic"
            className="menu-trigger menu-active"
          >
            {renderHeaderData()}
            <img src={pic} alt="profile" height={20} className="ml-2" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {renderDropdownItems()}
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  };

  const renderDropdownItems = () => {
    if (dropdown === true) {
      if (user_type === 'Doctor') {
        return(
          <div>
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            <Dropdown.Item href="/vet-dashboard">Vet Dashboard</Dropdown.Item>
            <Dropdown.Item href="/vet-account-details">Account Details</Dropdown.Item>
          </div>
        )
      }
      else if (user_type === 'Patient') {
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

  const searchDefaultValue = () => {
    if (location.pathname === '/') return ''
    return searchTerm
  }
  
  const renderSearch = () => {
    if (search === true) {
      return (
        <>
          <input
            type="search"
            id = "search-input"
            className = "form-control mr-sm-2"
            placeholder = "Search"
            aria-label = "Search"
            defaultValue = {searchDefaultValue()}
            onKeyUp = {handleKeyUp}
          />
          <div className="input-group-append">
            <button
              className="btn btn-dark"
              type="button"
              onClick={() => handleSearch(document.getElementById("search-input").value, setSearchTerm)}>
              Search
            </button>
          </div>
        </>
      )
    }
  }

  const renderLogo = () => {
    return (
      <img 
        src = {logo} 
        alt = "Logo" 
        width= {50}
        height = {50} 
        onClick = {handleHome}
        style={{ cursor: "pointer" }} 
        className="mr-2"
      />
    )
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          {renderLogo()}
          <div className="navbar-collapse" id="navbarSupportedContent">
            {renderSearch()}
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">{renderDropdown()}</li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
