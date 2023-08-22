import { useState, useEffect, useContext } from "react"
import {useNavigate} from "react-router-dom"
import { VerifyContext } from "../../contexts/verify-context"
import AuthDataService from "../../services/auth-data-service"
import NewAccountForm from "../../components/new-account-form"
import { useNewUserSubmit } from "../../custom-hooks/auth-submits/use-new-user-submit"
import Header from "../../components/header/header"

export default function NewPatient () {
  const [newPatientInfo, setNewPatientInfo] = useState<BirthDateInfo>({
    FirstName: "",
    LastName: "",
    DOB_month: "",
    DOB_day: -1,
    DOB_year: -1,
    Gender: ""
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const {userVerification} = useContext(VerifyContext)
  const navigate = useNavigate()

  const verifyNewPatient = async () => {
    const result = await userVerification(false)
    if (result.verified === true && result.userType === "Patient") {
      const patientResult = await AuthDataService.newPatientConfirmation()
      if (patientResult.data === false) navigate("/patient-register")
    }
    else if (result.verified === true && result.userType === "Doctor") navigate("/dashboard")
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
          useNewUserSubmit(
            e,
            newPatientInfo,
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
