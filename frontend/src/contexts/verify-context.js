import { createContext } from "react"
import AuthDataService from "../services/auth-data-service"
import { invalidUserAction } from "../custom-hooks/user-verification-snippets"

const VerifyContext = createContext()

function checkCookie(name) {
  return document.cookie.split(";").some((item) => item.trim().startsWith(name + "="))
}

function clearAndReturnFalse(clearSession) {
  if (clearSession) sessionStorage.clear()
  return { verified: false }
}

const VerifyContextProvider = (props) => {
  async function userVerification (clearSession) {
    try {
      if (!checkCookie("DoctorAccessToken") && !checkCookie("PatientAccessToken")) {
        return clearAndReturnFalse(clearSession)
      }

      const response = await AuthDataService.verify()

      if (response.data.isValid !== true)  return clearAndReturnFalse(clearSession)

      return {
        verified: true,
        userType: response.data.type || null
      }
    } catch(error) {
      if (error.response.status === 401) {
        invalidUserAction(error.response.data)
      } else {
        return clearAndReturnFalse(clearSession)
      }
    }
  }

  return (
    <VerifyContext.Provider value = {{ userVerification }}>
      {props.children}
    </VerifyContext.Provider>
  )
}

export { VerifyContext, VerifyContextProvider }
