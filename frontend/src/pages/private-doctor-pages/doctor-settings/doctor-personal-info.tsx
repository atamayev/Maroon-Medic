
import { Card, Button, Form } from "react-bootstrap"
import { UnauthorizedUser } from "../../../components/user-type-unauth"
import { RenderMessageSection } from "../../../components/saved-message-section"
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"
import { handleSavePersonalInfo, usePersonalInfo } from "../../../custom-hooks/fetch-and-save-personal-info"
import {
  renderFirstNameSection,
  renderLastNameSection,
  renderDOBSection,
  renderGenderSection
} from "../../../components/personal-info-inputs"
import Header from "../../header"
import DoctorHeader from "../doctor-header"

export default function DoctorPersonalInfo() {
  const { userType } = useSimpleUserVerification()
  if (userType !== "Doctor") return <UnauthorizedUser patientOrDoctor = {"vet"}/>

  const {personalInfo, setPersonalInfo } = usePersonalInfo(userType)
  const [personalInfoConfirmation, setPersonalInfoConfirmation] = useConfirmationMessage()

  return (
    <div>
      <Header dropdown = {true}/>
      <DoctorHeader/>
      <Card>
        <Card.Body>
          <Form onSubmit = {() => handleSavePersonalInfo(personalInfo, setPersonalInfoConfirmation, userType)}>
            {renderFirstNameSection({personalInfo: personalInfo, setPersonalInfo: setPersonalInfo})}
            {renderLastNameSection({personalInfo: personalInfo, setPersonalInfo: setPersonalInfo})}
            {renderGenderSection({personalInfo: personalInfo, setPersonalInfo: setPersonalInfo})}
            {renderDOBSection({personalInfo: personalInfo, setPersonalInfo: setPersonalInfo})}
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
