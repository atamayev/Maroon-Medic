import { useContext, useState, useEffect } from "react"
import { VerifyContext } from "../contexts/verify-context"

export default function useSimpleUserVerification(
  clearSession = true
): { userVerification: (clearSession: boolean) => VerifyContextReturnType, userType: DoctorOrPatientOrNull }
{
  const { userVerification } = useContext(VerifyContext)
  const [userType, setUserType] = useState<DoctorOrPatientOrNull>(null)

  const verify = async (): Promise<void> => {
    const result = await userVerification(clearSession)
    if (result.verified && result.userType) {
      setUserType(result.userType)
    }
  }

  useEffect(() => {
    verify()
  }, [])

  return { userVerification, userType }
}
