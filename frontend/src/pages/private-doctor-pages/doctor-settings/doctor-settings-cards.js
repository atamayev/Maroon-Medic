import { CardGroup } from "react-bootstrap"
import SettingsLinks from "../../../components/settings-links.js"
import { UnauthorizedUser } from "../../../components/user-type-unauth.js"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification.js"
import Header from "../../header.js"
import DoctorHeader from "../doctor-header.js"

export default function DoctorSettingsCards() {
  const { userType } = useSimpleUserVerification()

  if (userType !== "Doctor") return <UnauthorizedUser patientOrDoctor = {"vet"}/>

  return (
    <>
      <Header dropdown = {true}/>
      <DoctorHeader/>
      <CardGroup>
        <SettingsLinks SettingsLink = {"personal-information"} title = {"Personal Information"}/>
        <SettingsLinks SettingsLink = {"privacy"} title = {"Privacy"}/>
        <SettingsLinks SettingsLink = {"login-and-security"} title = {"Login & Security"}/>
      </CardGroup>
    </>
  )
}
