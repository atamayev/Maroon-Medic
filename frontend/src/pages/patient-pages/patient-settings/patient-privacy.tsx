import Header from "../../../components/header/header"
import PatientHeader from "../patient-header"
import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"

export default function PatientPrivacy() {
  const { userType } = useSimpleUserVerification()

  if (userType !== "Patient") return <UnauthorizedUser vetOrpatient = {"patient"}/>

  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <PatientHeader/>
      PatientPrivacy
    </>
  )
}
