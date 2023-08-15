import { CardGroup } from "react-bootstrap"
import SettingsLinks from "../../../components/settings-links"
import { UnauthorizedUser } from "../../../components/user-type-unauth"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"
import Header from "../../../components/header/header"
import PatientHeader from "../patient-header"

export default function PatientSettingsCards() {
  const { userType } = useSimpleUserVerification()

  if (userType !== "Patient") return <UnauthorizedUser vetOrpatient = {"patient"}/>

  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <PatientHeader/>
      <CardGroup>
        <SettingsLinks SettingsLink = {"personal-information"} title = {"Personal Information"}/>
        <SettingsLinks SettingsLink = {"privacy"} title = {"Privacy"}/>
        <SettingsLinks SettingsLink = {"login-and-security"} title = {"Login & Security"}/>
      </CardGroup>
    </>
  )
}
