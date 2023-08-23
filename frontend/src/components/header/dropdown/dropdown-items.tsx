import AuthDataService from "src/services/auth-data-service"
import {useCallback } from "react"
import { useLocation } from "react-router-dom"

const useHandleRefresh = () => {
  const location = useLocation()

  return useCallback(() => {
    if (location.pathname === "/") window.location.reload()
    else window.location.href = "/"
  }, [location])
}

interface Props {
  dropdown?: boolean
  userType: DoctorOrPatientOrNull
}

const DropdownItems = ({dropdown, userType} : Props) => {
  const handleRefresh = useHandleRefresh()

  const handleLogout = async () => {
    try {
      const response = await AuthDataService.logout()
      if (response.status === 200) sessionStorage.clear()
    } catch (error) {
    }
    handleRefresh()
  }

  //TODO: Change the hrefs to Links (no refresh)

  if (dropdown === false) return null
  if (userType === "Doctor" || userType === "Patient") {
    return (
      <>
        <a href="/dashboard" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Dashboard</a>
        <a href="/account-details" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Account Details</a>
        <button onClick = {handleLogout} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Sign out</button>
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

export default DropdownItems
