import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useSimpleUserVerification from "./use-simple-user-verification"

const useConfirmNotLoggedIn = (clearSession = true): void => {
  const { userType } = useSimpleUserVerification(clearSession)
  const navigate = useNavigate()

  useEffect(() => {
    if (userType ) navigate("/dashboard")
  }, [userType, navigate])
}

export default useConfirmNotLoggedIn
