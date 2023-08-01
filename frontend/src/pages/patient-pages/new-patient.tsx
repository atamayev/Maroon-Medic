import { AxiosError } from "axios"
import { useState, useEffect, useContext } from "react"
import {useNavigate} from "react-router-dom"
import { VerifyContext } from "../../contexts/verify-context"
import AuthDataService from "../../services/auth-data-service"
import NewAccountForm from "../../components/new-account-form"
import {handleNewUserSubmit} from "../../custom-hooks/handle-submits"
import { invalidUserAction } from "../../custom-hooks/user-verification-snippets"
import Header from "../header"

export default function NewPatient () {
  const [newPatientInfo, setNewPatientInfo] = useState<PersonalInfoType>({
    FirstName: "",
    LastName: "",
    DOB_month: "",
    DOB_day: 0,
    DOB_year: 0,
    Gender: ""
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const {userVerification} = useContext(VerifyContext)
  const navigate = useNavigate()

  const verifyNewPatient = async () => {
    const result = await userVerification(false)
    if (result.verified === true && result.userType === "Patient") {
      try {
        const patientResult = await AuthDataService.newPatientConfirmation()
        if (patientResult.data === false) navigate("/patient-register")
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            invalidUserAction(error.response.data)
          }
        }
      }
    }
    else if (result.verified === true && result.userType === "Doctor") navigate("/vet-dashboard")
    else navigate("/patient-register")
  }

  useEffect(() => {
    verifyNewPatient()
  }, [])

  return (
    <>
      <Header/>
      <NewAccountForm
        handleSubmit = {() =>
          handleNewUserSubmit(
            newPatientInfo,
            navigate,
            setError,
            setLoading,
            "Patient"
          )}
        newInfo = {newPatientInfo}
        setNewInfo = {setNewPatientInfo}
        error = {error}
        loading = {loading}
      />
    </>
  )
}
