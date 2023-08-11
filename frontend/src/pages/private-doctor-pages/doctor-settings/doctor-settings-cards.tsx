import { CardGroup } from "react-bootstrap"
import SettingsLinks from "../../../components/settings-links"
import { UnauthorizedUser } from "../../../components/user-type-unauth"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"
import Header from "../../header"
import DoctorHeader from "../doctor-header"

export default function DoctorSettingsCards() {
  const { userType } = useSimpleUserVerification()

  if (userType !== "Doctor") return <UnauthorizedUser vetOrpatient = {"vet"}/>

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
