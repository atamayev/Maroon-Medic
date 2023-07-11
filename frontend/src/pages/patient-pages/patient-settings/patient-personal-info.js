import { Card, Button, Form } from "react-bootstrap"
import { UnauthorizedUser } from "../../../components/user-type-unauth.js"
import { renderMessageSection } from "../../../components/saved-message-section.js"
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message.js"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification.js"
import { usePersonalInfo, handleSavePersonalInfo } from "../../../custom-hooks/fetch-and-save-personal-info.js"
import { renderFirstNameSection, renderLastNameSection, renderDOBSection, renderGenderSection } from "../../../components/personal-info-inputs.js"
import Header from "../../header.js"
import PatientHeader from "../patient-header.js"

const handleSave = (e, personalInfo, setPersonalInfoConfirmation, userType) => {
  e.preventDefault()
  handleSavePersonalInfo(personalInfo, setPersonalInfoConfirmation, userType)
}

export default function PatientPersonalInfo() {
  const { userType } = useSimpleUserVerification()
  const {personalInfo, setPersonalInfo} = usePersonalInfo(userType)
  const [personalInfoConfirmation, setPersonalInfoConfirmation] = useConfirmationMessage()

  if (userType !== "Patient") return <UnauthorizedUser patientOrDoctor = {"patient"}/>

  return (
    <div>
      <Header dropdown = {true} search = {true}/>
      <PatientHeader/>
      <Card>
        <Card.Body>
          <Form onSubmit = {e => handleSave(e, personalInfo, setPersonalInfoConfirmation, userType)}>
            {renderFirstNameSection(personalInfo, setPersonalInfo)}
            {renderLastNameSection(personalInfo, setPersonalInfo)}
            {renderGenderSection(personalInfo, setPersonalInfo)}
            {renderDOBSection(personalInfo, setPersonalInfo)}
            <Button type = "submit" className = "btn btn-primary w-100">Save</Button>
            {renderMessageSection(personalInfoConfirmation, "Personal Info")}
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}
