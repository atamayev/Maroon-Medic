import moment from "moment"
import { useState, useEffect } from "react"
import AuthDataService from "../services/auth-data-service"
import { handle401AxiosError } from "src/utils/handle-errors"

type LoginHistoryItem = {
  login_historyID: number
  Login_at: string
}

export async function fetchLoginHistory(
  setLoginHistory: React.Dispatch<React.SetStateAction<LoginHistoryItem[]>>
): Promise<void> {
  try {
    const response = await AuthDataService.fetchLoginHistry()
    if (response) {
      const formattedData = response.data.map((item: LoginHistoryItem) => ({
        ...item,
        Login_at: moment(item.Login_at).format("MMMM Do, YYYY [at] h:mmA"),
      }))
      setLoginHistory(formattedData)
      sessionStorage.setItem("LoginHistory", JSON.stringify(formattedData))
    }
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}

export function useLoginHistory(
  userType: DoctorOrPatientOrNull, expectedUserType: DoctorOrPatient
): LoginHistoryItem[] {
  const [loginHistory, setLoginHistory] = useState<LoginHistoryItem[]>([])

  const checkForLoginHistory: () => Promise<void> = async () => {
    try {
      const storedLoginHistory = sessionStorage.getItem("LoginHistory")
      if (storedLoginHistory) setLoginHistory(JSON.parse(storedLoginHistory))
      else await fetchLoginHistory(setLoginHistory)
    } catch (error) {
    }
  }

  useEffect(() => {
    if (userType !== expectedUserType) return
    checkForLoginHistory()
  }, [userType])

  return loginHistory
}
