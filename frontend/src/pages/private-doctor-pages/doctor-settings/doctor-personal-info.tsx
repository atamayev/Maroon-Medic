
import { Card, Button, Form } from "react-bootstrap"
import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"
import { handleSavePersonalInfo, usePersonalInfo } from "../../../custom-hooks/fetch-and-save-personal-info"
import FirstNameInput from "src/components/personal-info-inputs/first-name-input"
import LastNameInput from "src/components/personal-info-inputs/last-name-input"
import GenderSection from "src/components/personal-info-inputs/gender-input"
import DOBSection from "src/components/date-of-birth/dob-section"
import Header from "../../../components/header/header"
import DoctorHeader from "../doctor-header"

export default function DoctorPersonalInfo() {
  const { userType } = useSimpleUserVerification()
  const {personalInfo, setPersonalInfo } = usePersonalInfo(userType, "Doctor")
  const [personalInfoConfirmation, setPersonalInfoConfirmation] = useConfirmationMessage()

  if (userType !== "Doctor") return <UnauthorizedUser vetOrpatient = {"vet"}/>

  return (
    <div>
      <Header dropdown = {true}/>
      <DoctorHeader/>
      <Card>
        <Card.Body>
          <Form onSubmit = {(e) => {
            e.preventDefault()
            handleSavePersonalInfo(personalInfo, setPersonalInfoConfirmation, userType)
          }}>
            <FirstNameInput personalInfo = {personalInfo} setPersonalInfo = {setPersonalInfo} />
            <LastNameInput personalInfo = {personalInfo} setPersonalInfo = {setPersonalInfo} />
            <GenderSection personalInfo = {personalInfo} setPersonalInfo = {setPersonalInfo} />
            <DOBSection personalInfo = {personalInfo} setPersonalInfo = {setPersonalInfo} />
            <Button type = "submit" className = "btn btn-primary w-100">Save</Button>
            <SavedConfirmationMessage
              confirmationMessage = {personalInfoConfirmation}
              whatIsBeingSaved = "Personal Info"
            />
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}
