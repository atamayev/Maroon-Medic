import { AxiosError } from "axios"
import { useState, useEffect, useContext } from "react"
import {useNavigate} from "react-router-dom"
import { VerifyContext } from "../../contexts/verify-context"
import AuthDataService from "../../services/auth-data-service"
import NewAccountForm from "../../components/new-account-form"
import {handleNewUserSubmit} from "../../custom-hooks/handle-submits"
import { invalidUserAction } from "../../custom-hooks/user-verification-snippets"
import Header from "../header"
import { PersonalInfoType } from "../../components/personal-info-inputs"

export default function NewDoctor () {
  const [newDoctorInfo, setNewDoctorInfo] = useState({} as PersonalInfoType)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const {userVerification} = useContext(VerifyContext)
  const navigate = useNavigate()

  const verifyNewDoctor = async () => {
    const result = await userVerification(false)
    if (result.verified === true && result.userType === "Doctor") {
      try {
        const doctorResult = await AuthDataService.newDoctorConfirmation()
        if (doctorResult.data === false) navigate("/vet-register")
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            invalidUserAction(error.response.data)
          }
        }
      }
    }
    else if (result.verified === true && result.userType === "Patient") navigate("/patient-dashboard")
    else navigate("/vet-register")
  }

  useEffect(() => {
    verifyNewDoctor()
  }, [])

  return (
    <>
      <Header/>
      <NewAccountForm
        handleSubmit = {() =>
          handleNewUserSubmit(
            newDoctorInfo,
            navigate,
            setError,
            setLoading,
            "Vet"
          )}
        newInfo = {newDoctorInfo}
        setNewInfo = {setNewDoctorInfo}
        error = {error}
        loading = {loading}
      />
    </>
  )
}
