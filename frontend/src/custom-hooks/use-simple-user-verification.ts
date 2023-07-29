import { useContext, useState, useEffect } from "react"
import { VerifyContext } from "../contexts/verify-context"

export default function useSimpleUserVerification(clearSession = true) {
  const { userVerification } = useContext(VerifyContext)
  const [userType, setUserType] = useState<"Doctor" | "Patient" | null>(null)

  const verify = async () => {
    const result = await userVerification(clearSession)
    if (result.verified === true) setUserType(result.userType as "Doctor" | "Patient" | null)
  }

  useEffect(() => {
    verify()
  }, [])

  return {userVerification, userType}
}
