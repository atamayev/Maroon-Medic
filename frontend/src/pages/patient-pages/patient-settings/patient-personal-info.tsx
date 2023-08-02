import { Card, Button, Form } from "react-bootstrap"
import { UnauthorizedUser } from "../../../components/user-type-unauth"
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
import Header from "../../header"
import PatientHeader from "../patient-header"

export default function PatientPersonalInfo() {
  const { userType } = useSimpleUserVerification()

  if (userType !== "Patient") return <UnauthorizedUser patientOrDoctor = {"patient"}/>

  const {personalInfo, setPersonalInfo} = usePersonalInfo(userType)
  const [personalInfoConfirmation, setPersonalInfoConfirmation] = useConfirmationMessage()

  return (
    <div>
      <Header dropdown = {true} search = {true}/>
      <PatientHeader/>
      <Card>
        <Card.Body>
          <Form onSubmit = {() => handleSavePersonalInfo(personalInfo, setPersonalInfoConfirmation, userType)}>
            {RenderFirstNameSection({personalInfo: personalInfo, setPersonalInfo: setPersonalInfo})}
            {RenderLastNameSection({personalInfo: personalInfo, setPersonalInfo: setPersonalInfo})}
            {RenderGenderSection({personalInfo: personalInfo, setPersonalInfo: setPersonalInfo})}
            {RenderDOBSection({personalInfo: personalInfo, setPersonalInfo: setPersonalInfo})}
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
