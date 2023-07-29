import moment from "moment"
import { useState, useEffect } from "react"
import AuthDataService from "../services/auth-data-service"
import { invalidUserAction } from "./user-verification-snippets"
import { AxiosError } from "axios"

type LoginHistoryItem = {
  login_historyID: number
  Login_at: string
}

export async function fetchLoginHistory(setLoginHistory: React.Dispatch<React.SetStateAction<LoginHistoryItem[]>>) {
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
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        invalidUserAction(error.response.data)
      }
    }
  }
}

export function useLoginHistory (userType: "Doctor" | "Patient", whatShouldUserTypeBe: "Doctor" | "Patient") {
  const [loginHistory, setLoginHistory] = useState<LoginHistoryItem[]>([])

  const checkForLoginHistory = async () => {
    if (userType === whatShouldUserTypeBe) {
      try {
        const storedLoginHistory = sessionStorage.getItem("LoginHistory")
        if (storedLoginHistory) setLoginHistory(JSON.parse(storedLoginHistory))
        else fetchLoginHistory(setLoginHistory)
      } catch (error) {
      }
    }
  }

  useEffect(() => {
    checkForLoginHistory()
  }, [userType])

  return loginHistory
}
