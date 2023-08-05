import { AxiosError } from "axios"
import { createContext } from "react"
import AuthDataService from "../services/auth-data-service"
import { invalidUserAction } from "../custom-hooks/user-verification-snippets"
import CookieUtils from "src/utils/cookie"

type UserTypes = DoctorOrPatient

type VerifyContextReturnType = Promise<{verified: boolean, userType?: UserTypes}>

interface VerifyContextType {
  userVerification: (clearSession: boolean) => VerifyContextReturnType
}

const createDefaultContext = (): VerifyContextType => ({ userVerification: () => Promise.resolve({verified: false}) })

const VerifyContext = createContext<VerifyContextType>(createDefaultContext())

function clearAndReturnFalse(clearSession: boolean): {verified: boolean} {
  if (clearSession) sessionStorage.clear()
  return { verified: false }
}

interface VerifyContextProviderProps {
  children: JSX.Element | JSX.Element[]
}

const handleError = (error: unknown, clearSession: boolean) => {
  if (error instanceof AxiosError && error.response?.status === 401) {
    invalidUserAction(error.response.data)
  }
  return clearAndReturnFalse(clearSession)
}

const VerifyContextProvider = ({ children }: VerifyContextProviderProps) => {
  async function userVerification(clearSession: boolean): VerifyContextReturnType {
    try {
      if (!CookieUtils.checkCookieForContext("DoctorAccessToken") && !CookieUtils.checkCookieForContext("PatientAccessToken")) {
        return clearAndReturnFalse(clearSession)
      }

      const response = await AuthDataService.verify()

      if (response.data.isValid !== true) {
        return clearAndReturnFalse(clearSession)
      }

      return {
        verified: true,
        userType: response.data.type,
      }
    } catch (error: unknown) {
      return handleError(error, clearSession)
    }
  }

  return (
    <VerifyContext.Provider value={{ userVerification }}>
      {children}
    </VerifyContext.Provider>
  )
}

export { VerifyContext, VerifyContextProvider }
