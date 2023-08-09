import Header from "../../header"
import DoctorHeader from "../doctor-header"
import { UnauthorizedUser } from "../../../components/user-type-unauth"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"

export default function DoctorPrivacy() {
  const { userType } = useSimpleUserVerification()

  if (userType !== "Doctor") return <UnauthorizedUser patientOrDoctor = {"vet"}/>

  return (
    <>
      <Header dropdown = {true}/>
      <DoctorHeader/>
      DoctorPrivacy
    </>
  )
}