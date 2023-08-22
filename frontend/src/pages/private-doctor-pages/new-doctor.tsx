import { useState, useEffect, useContext } from "react"
import {useNavigate} from "react-router-dom"
import { VerifyContext } from "../../contexts/verify-context"
import AuthDataService from "../../services/auth-data-service"
import NewAccountForm from "../../components/new-account-form"
import { useNewUserSubmit } from "../../custom-hooks/auth-submits/use-new-user-submit"
import Header from "../../components/header/header"

export default function NewDoctor () {
  const [newDoctorInfo, setNewDoctorInfo] = useState<BirthDateInfo>({
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

  const verifyNewDoctor = async () => {
    const result = await userVerification(false)
    if (result.verified === true && result.userType === "Doctor") {
      const doctorResult = await AuthDataService.newDoctorConfirmation()
      if (doctorResult.data === false) navigate("/vet-register")
    }
    else if (result.verified === true && result.userType === "Patient") navigate("/dashboard")
    else navigate("/vet-register")
  }

  useEffect(() => {
    verifyNewDoctor()
  }, [])

  return (
    <>
      <Header/>
      <NewAccountForm
        handleSubmit = {(e) =>
          useNewUserSubmit(
            e,
            newDoctorInfo,
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
