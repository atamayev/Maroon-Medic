import {useCallback, useState, useEffect, useContext } from 'react'
import {Dropdown} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import logo from "../images/logo.svg"
import pic from '../images/ProfileImage.jpg';
import { SearchContext } from '../contexts/search-context';
import AuthDataService from '../services/auth-data-service';
import { invalidUserAction } from '../custom-hooks/user-verification-snippets'
import PrivateDoctorDataService from '../services/private-doctor-data-service'
import PrivatePatientDataService from '../services/private-patient-data-service';
import useSimpleUserVerification from '../custom-hooks/use-simple-user-verification';

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

function useSetHeaderData(userType) {
  const [headerData, setHeaderData] = useState('');

  const getHeaderData = async () => {
    if (!userType) return;
    try {
      let name;
      if (userType === 'Doctor') {
        name = JSON.parse(sessionStorage.getItem('DoctorPersonalInfo')).LastName;
        setHeaderData('Dr. ' + name);
      } else {
        name = JSON.parse(sessionStorage.getItem('PatientPersonalInfo')).FirstName;
        setHeaderData(name);
      }
    } catch (error) {
      if (error instanceof TypeError) await fetchPersonalInfo(userType, setHeaderData);
    }
  }

  useEffect(() => {
    getHeaderData();
  }, [userType]);

  return {headerData, setHeaderData};
}

async function fetchPersonalInfo (type, setHeaderData) {
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

const retrieveNameFromStorage = (setHeaderData) => {
  try {
    const name = JSON.parse(sessionStorage.getItem("DoctorPersonalInfo")).LastName;
    setHeaderData('Dr. '+ name);
    return;
  } catch(error) {
  }
  try {
    const name = JSON.parse(sessionStorage.getItem("PatientPersonalInfo")).FirstName;
    setHeaderData(name);
    return;
  } catch(error) {
  }
}

export default function Header (props) {
  const { dropdown, search } = props;
  const location = useLocation();
  const { userType } = useSimpleUserVerification(false);
  const { headerData, setHeaderData } = useSetHeaderData(userType);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  useEffect(() => {
    if (location.pathname !== '/new-vet' && location.pathname !== '/new-patient') {
      retrieveNameFromStorage(setHeaderData)
    }
  }, []);

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
        <Dropdown className = "menu-container">
          <Dropdown.Toggle
            variant = "dark"
            id = "dropdown-basic"
            className = "menu-trigger menu-active"
          >
            {renderHeaderData()}
            <img src = {pic} alt = "profile" height = {20} className = "ml-2" />
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
      if (userType === 'Doctor') {
        return(
          <div>
            <Dropdown.Item onClick = {handleLogout}>Sign out</Dropdown.Item>
            <Dropdown.Item href = "/vet-dashboard">Vet Dashboard</Dropdown.Item>
            <Dropdown.Item href = "/vet-account-details">Account Details</Dropdown.Item>
          </div>
        )
      }
      else if (userType === 'Patient') {
        return(
          <div>
            <Dropdown.Item onClick = {handleLogout}>Sign out</Dropdown.Item>
            <Dropdown.Item href = "/patient-dashboard">Patient Dashboard</Dropdown.Item>
            <Dropdown.Item href = "/patient-account-details">Account Settings</Dropdown.Item>
          </div>
        )
      }
      else {
        return(
          <div>
            <Dropdown.Item href = "/vet-register" className = 'fw-bold'>Vet Sign up</Dropdown.Item>
            <Dropdown.Item href = "/vet-login">Vet Log In</Dropdown.Item>
            <Dropdown.Item href = "/patient-register" className = 'fw-bold'>Patient Sign up</Dropdown.Item>
            <Dropdown.Item href = "/patient-login">Patient Log In</Dropdown.Item>

            <Dropdown.Divider />
            <Dropdown.Item href = "/help">Help</Dropdown.Item>
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
            type = "search"
            id = "search-input"
            className = "form-control mr-sm-2"
            placeholder = "Search"
            aria-label = "Search"
            defaultValue = {searchDefaultValue()}
            onKeyUp = {handleKeyUp}
          />
          <div className = "input-group-append">
            <button
              className = "btn btn-dark"
              type = "button"
              onClick = {() => handleSearch(document.getElementById("search-input").value, setSearchTerm)}>
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
        width = {50}
        height = {50}
        onClick = {handleHome}
        style = {{ cursor: "pointer" }}
        className = "mr-2"
      />
    )
  }

  return (
    <header>
      <nav className = "navbar navbar-expand-lg navbar-light bg-light">
        <div className = "container">
          {renderLogo()}
          <div className = "navbar-collapse" id = "navbarSupportedContent">
            {renderSearch()}
            <ul className = "navbar-nav ml-auto">
              <li className = "nav-item">{renderDropdown()}</li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
