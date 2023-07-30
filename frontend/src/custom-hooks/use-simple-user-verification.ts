import { useContext, useState, useEffect } from "react"
import { VerifyContext } from "../contexts/verify-context"

type UserTypes = "Doctor" | "Patient" | null

export default function useSimpleUserVerification(clearSession = true) {
  const { userVerification } = useContext(VerifyContext)
  const [userType, setUserType] = useState<UserTypes>(null)

  const verify = async () => {
    const result = await userVerification(clearSession)
    if (result.verified === true) setUserType(result.userType as UserTypes)
  }

  useEffect(() => {
    verify()
  }, [])

  return {userVerification, userType}
}
