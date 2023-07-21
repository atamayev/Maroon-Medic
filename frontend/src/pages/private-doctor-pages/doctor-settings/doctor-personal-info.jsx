
import { Card, Button, Form } from "react-bootstrap"
import { UnauthorizedUser } from "../../../components/user-type-unauth"
import { renderMessageSection } from "../../../components/saved-message-section"
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"
import { handleSavePersonalInfo, usePersonalInfo } from "../../../custom-hooks/fetch-and-save-personal-info"
import { renderFirstNameSection, renderLastNameSection, renderDOBSection, renderGenderSection } from "../../../components/personal-info-inputs"
import Header from "../../header"
import DoctorHeader from "../doctor-header"

const handleSave = (e, personalInfo, setPersonalInfoConfirmation, userType) => {
  e.preventDefault()
  handleSavePersonalInfo(personalInfo, setPersonalInfoConfirmation, userType)
}

export default function DoctorPersonalInfo() {
  const { userType } = useSimpleUserVerification()
  const {personalInfo, setPersonalInfo } = usePersonalInfo(userType)
  const [personalInfoConfirmation, setPersonalInfoConfirmation] = useConfirmationMessage()

  if (userType !== "Doctor") return <UnauthorizedUser patientOrDoctor = {"vet"}/>

  return (
    <div>
      <Header dropdown = {true}/>
      <DoctorHeader/>
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
