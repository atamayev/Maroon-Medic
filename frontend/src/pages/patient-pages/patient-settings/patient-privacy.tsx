import Header from "../../header"
import PatientHeader from "../patient-header"
import { UnauthorizedUser } from "../../../components/user-type-unauth"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"

export default function PatientPrivacy() {
  const { userType } = useSimpleUserVerification()

  if (userType !== "Patient") return <UnauthorizedUser patientOrDoctor = {"patient"}/>

  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <PatientHeader/>
      PatientPrivacy
    </>
  )
}
