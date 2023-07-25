import { useState, useEffect, useContext } from "react"
import {useNavigate} from "react-router-dom"
import { VerifyContext } from "../../contexts/verify-context"
import AuthDataService from "../../services/auth-data-service"
import NewAccountForm from "../../components/new-account-form"
import {handleNewUserSubmit} from "../../custom-hooks/handle-submits"
import { invalidUserAction } from "../../custom-hooks/user-verification-snippets"
import Header from "../header"

export default function NewPatient () {
  const [newPatientInfo, setNewPatientInfo] = useState({})
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const {userVerification} = useContext(VerifyContext)
  const navigate = useNavigate()

  const verifyNewPatient = async () => {
    const result = await userVerification()
    if (result.verified === true && result.userType === "Patient") {
      try {
        const patientResult = await AuthDataService.newPatientConfirmation()
        if (patientResult.data === false) navigate("/patient-register")
      } catch (error) {
        if (error.response.status === 401) invalidUserAction(error.response.data)
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
        handleSubmit = {(e) =>
          handleNewUserSubmit(
            {
              e,
              newInfo: newPatientInfo,
              navigate,
              setError,
              setLoading,
              VetOrPatient: "Patient"
            }
          )}
        newInfo = {newPatientInfo}
        setNewInfo = {setNewPatientInfo}
        error = {error}
        loading = {loading}
      />
    </>
  )
}