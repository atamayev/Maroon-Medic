import { Card, Button, Form } from "react-bootstrap"
import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"
import { RenderMessageSection } from "../../../components/saved-message-section"
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"
import { usePersonalInfo, handleSavePersonalInfo } from "../../../custom-hooks/fetch-and-save-personal-info"
import {
  RenderFirstNameSection,
  RenderLastNameSection,
  RenderDOBSection,
  RenderGenderSection
} from "../../../components/personal-info-inputs"
import Header from "../../../components/header/header"
import PatientHeader from "../patient-header"

export default function PatientPersonalInfo() {
  const { userType } = useSimpleUserVerification()

  const {personalInfo, setPersonalInfo} = usePersonalInfo(userType, "Patient")
  const [personalInfoConfirmation, setPersonalInfoConfirmation] = useConfirmationMessage()

  if (userType !== "Patient") return <UnauthorizedUser vetOrpatient = {"patient"}/>

  return (
    <div>
      <Header dropdown = {true} search = {true}/>
      <PatientHeader/>
      <Card>
        <Card.Body>
          <Form onSubmit = {(e) => {
            e.preventDefault()
            handleSavePersonalInfo(personalInfo, setPersonalInfoConfirmation, userType)
          }}>
            <RenderFirstNameSection personalInfo = {personalInfo} setPersonalInfo = {setPersonalInfo} />
            <RenderLastNameSection personalInfo = {personalInfo} setPersonalInfo = {setPersonalInfo} />
            <RenderGenderSection personalInfo = {personalInfo} setPersonalInfo = {setPersonalInfo} />
            <RenderDOBSection personalInfo = {personalInfo} setPersonalInfo = {setPersonalInfo} />
            <Button type = "submit" className = "btn btn-primary w-100">Save</Button>
            <RenderMessageSection
              confirmationMessage = {personalInfoConfirmation}
              whatIsBeingSaved = "Personal Info"
            />
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}
