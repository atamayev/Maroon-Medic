import _ from "lodash"
import {Dropdown} from "react-bootstrap"
import {useLocation} from "react-router-dom"
import {useCallback, useState, useEffect, useContext } from "react"
import logo from "../images/logo.svg"
import pic from "../images/ProfileImage.jpg"
import { SearchContext } from "../contexts/search-context"
import AuthDataService from "../services/auth-data-service"
import PrivateDoctorDataService from "../services/private-doctor-data-service"
import PrivatePatientDataService from "../services/private-patient-data-service"
import useSimpleUserVerification from "../custom-hooks/use-simple-user-verification"
import { handle401AxiosError } from "src/utils/handle-errors"

const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.key === "Enter") {
    const value = (event.target as HTMLInputElement).value
    if (!value) {
      sessionStorage.setItem("searchTerm", "")
      window.location.href = "/"
    } else {
      sessionStorage.setItem("searchTerm", value)
      window.location.href = `/s/${value}`
    }
  }
}

const handleSearch = (value: string, setSearchTerm: (value: string) => void) => {
  if (!value) {
    sessionStorage.setItem("searchTerm", "")
    window.location.href = "/"
  } else {
    setSearchTerm(value)
    window.location.href = `/s/${value}`
  }
}

const handleHome = () => {
  sessionStorage.setItem("searchTerm", "")
  window.location.href = "/"
}

function useSetHeaderData(userType: DoctorOrPatientOrNull) {
  const [headerData, setHeaderData] = useState("")

  const getHeaderData = async () => {
    try {
      if (!userType) return setHeaderData("Profile")
      if (userType === "Doctor") {
        const storedInfo = sessionStorage.getItem("DoctorPersonalInfo")
        if (storedInfo) setHeaderData("Dr. " + _.upperFirst(JSON.parse(storedInfo).LastName))
        else await fetchPersonalInfo(userType, setHeaderData)
      } else {
        const storedInfo = sessionStorage.getItem("PatientPersonalInfo")
        if (storedInfo) setHeaderData(JSON.parse(storedInfo).FirstName)
        else await fetchPersonalInfo(userType, setHeaderData)
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    getHeaderData()
  }, [userType])

  return {headerData, setHeaderData}
}

async function fetchPersonalInfo (type: DoctorOrPatient, setHeaderData: React.Dispatch<React.SetStateAction<string>>) {
  let response
  if (type === "Doctor") {
    try {
      response = await PrivateDoctorDataService.fillPersonalData()
    } catch (error: unknown) {
      handle401AxiosError(error)
    }
  }
  else if (type === "Patient") {
    try {
      response = await PrivatePatientDataService.fillPersonalData()
    } catch (error: unknown) {
      handle401AxiosError(error)
    }
  }

  if (response) {
    setHeaderData(response.data.FirstName)
    sessionStorage.setItem(`${type}PersonalInfo`, JSON.stringify(response.data))
  }
}

interface HeaderProps {
  dropdown?: boolean,
  search?: boolean
}

export default function Header (props: HeaderProps) {
  const { dropdown, search } = props
  const location = useLocation()
  const { userType } = useSimpleUserVerification(false)
  const { headerData } = useSetHeaderData(userType)
  const { searchTerm, setSearchTerm } = useContext(SearchContext)
  console.log(userType)
  const handleLogout = async () => {
    try {
      const response = await AuthDataService.logout()
      if (response.status === 200) sessionStorage.clear()
    } catch (error) {
    }
    handleRefresh()
  }

  const handleRefresh = useCallback(() => {
    if (location.pathname === "/") window.location.reload()
    else window.location.href = "/"
  }, [location])

  const RenderDropdown = () => {
    if (dropdown === false) return null
    return (
      <Dropdown className = "menu-container">
        <Dropdown.Toggle
          variant = "dark"
          id = "dropdown-basic"
          className = "menu-trigger menu-active"
        >
          {headerData}
          <img src = {pic} alt = "profile" height = {20} className = "ml-2" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <RenderDropdownItems />
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  const RenderDropdownItems = () => {
    if (dropdown === false) return null
    if (userType === "Doctor") {
      return (
        <div>
          <Dropdown.Item onClick = {handleLogout}>Sign out</Dropdown.Item>
          <Dropdown.Item href = "/vet-dashboard">Vet Dashboard</Dropdown.Item>
          <Dropdown.Item href = "/vet-account-details">Account Details</Dropdown.Item>
        </div>
      )
    }
    else if (userType === "Patient") {
      return (
        <div>
          <Dropdown.Item onClick = {handleLogout}>Sign out</Dropdown.Item>
          <Dropdown.Item href = "/patient-dashboard">Patient Dashboard</Dropdown.Item>
          <Dropdown.Item href = "/patient-account-details">Account Settings</Dropdown.Item>
        </div>
      )
    }
    return (
      <div>
        <Dropdown.Item href = "/vet-register" className = "fw-bold">Vet Sign up</Dropdown.Item>
        <Dropdown.Item href = "/vet-login">Vet Log In</Dropdown.Item>
        <Dropdown.Item href = "/patient-register" className = "fw-bold">Patient Sign up</Dropdown.Item>
        <Dropdown.Item href = "/patient-login">Patient Log In</Dropdown.Item>

        <Dropdown.Divider />
        <Dropdown.Item href = "/help">Help</Dropdown.Item>
      </div>
    )
  }

  const searchDefaultValue = () => {
    if (location.pathname === "/") return ""
    return searchTerm || ""
  }

  const RenderSearch = () => {
    if (search === false) return null
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
            onClick = {() => {
              const inputElement = document.getElementById("search-input")
              if (inputElement) {
                handleSearch((inputElement as HTMLInputElement).value, setSearchTerm)
              }
            }}
          >
            Search
          </button>
        </div>
      </>
    )
  }

  const RenderLogo = () => {
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
          <RenderLogo />
          <div className = "navbar-collapse" id = "navbarSupportedContent">
            <RenderSearch />
            <ul className = "navbar-nav ml-auto">
              <li className = "nav-item">
                <RenderDropdown />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
