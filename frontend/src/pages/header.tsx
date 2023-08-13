import _ from "lodash"
import {useLocation} from "react-router-dom"
import {useCallback, useState, useEffect, useContext, useRef } from "react"
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
  else {
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
    const [isOpen, setIsOpen] = useState(false)

    const dropdownRef = useRef<HTMLDivElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    if (dropdown === false) return null

    return (
      <div className="relative inline-block text-left" ref = {dropdownRef}>
        <button
          type="button"
          className="bg-gray-800 text-white rounded px-4 py-2 flex items-center text-sm"
          id="menu-button"
          aria-expanded="false"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="max-w-xs truncate">
            {headerData}
          </span>
          <img src={pic} alt="profile" className="ml-2 h-5 w-5" />
        </button>
        {RenderDropdownItemsSection(isOpen)}
      </div>
    )
  }

  const RenderDropdownItemsSection = (isOpen: boolean) => {
    if (!isOpen) return null
    return (
      <div
        className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="py-1" role="none">
          <RenderDropdownItems />
        </div>
      </div>
    )
  }

  const RenderDropdownItems = () => {
    if (dropdown === false) return null
    if (userType === "Doctor" || userType === "Patient") {
      return (
        <>
          <a href="/dashboard" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Dashboard</a>
          <a href="/account-details" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Account Details</a>
          <button onClick={handleLogout} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Sign out</button>
        </>
      )
    }
    return (
      <>
        <a href="/vet-register" className="font-bold text-gray-700 block px-4 py-2 text-sm" role="menuitem">Vet Sign up</a>
        <a href="/vet-login" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Vet Log In</a>
        <a href="/patient-register" className="font-bold text-gray-700 block px-4 py-2 text-sm" role="menuitem">Patient Sign up</a>
        <a href="/patient-login" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Patient Log In</a>
        <div className="border-t border-gray-100"></div>
        <a href="/help" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Help</a>
      </>
    )
  }

  const searchDefaultValue = () => {
    if (location.pathname === "/") return ""
    return searchTerm || ""
  }

  const RenderSearch = () => {
    if (search === false) return null
    return (
      <div className="flex items-center justify-center space-x-2 w-full">
        <input
          type="search"
          id="search-input"
          className="border border-gray-500 bg-white rounded py-2 px-4 w-1/2 "
          placeholder="Search"
          aria-label="Search"
          defaultValue={searchDefaultValue()}
          onKeyUp={handleKeyUp}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:ring focus:ring-opacity-50"
          type="button"
          onClick={() => {
            const inputElement = document.getElementById("search-input")
            if (inputElement) {
              handleSearch((inputElement as HTMLInputElement).value, setSearchTerm)
            }
          }}
        >
          Search
        </button>
      </div>
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
    <header className="bg-white shadow rounded-b-md">
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="w-1/4">
          <RenderLogo />
        </div>
        <div className="w-1/2">
          <RenderSearch />
        </div>
        <div className="w-1/4 flex justify-end">
          <div className="flex items-center">
            <RenderDropdown />
          </div>
        </div>
      </nav>
    </header>
  )
}
