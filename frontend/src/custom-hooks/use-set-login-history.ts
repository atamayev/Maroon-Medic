import { useState, useEffect } from "react"
import fetchLoginHistory from "src/helper-functions/shared/fetch-login-history"

export default function useSetLoginHistory(
  userType: DoctorOrPatientOrNull,
  expectedUserType: DoctorOrPatient
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
