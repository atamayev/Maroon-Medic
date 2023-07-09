import { CardGroup } from "react-bootstrap"
import SettingsLinks from "../../../components/settings-links"
import { NonPatientAccess } from "../../../components/user-type-unauth"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"
import Header from "../../header"
import PatientHeader from "../patient-header"

export default function PatientSettings() {
  const { userType } = useSimpleUserVerification()

  if (userType !== "Patient") return <NonPatientAccess/>

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
