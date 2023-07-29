import { Card, Button, Form, Alert } from "react-bootstrap"
import { renderFirstNameSection, renderLastNameSection, renderGenderSection, renderDOBSection } from "./personal-info-inputs"
import { PersonalInfo } from "./personal-info-inputs"

interface Props {
  handleSubmit: () => void,
  error: string,
  newInfo: PersonalInfo,
  setNewInfo: (newInfo: PersonalInfo) => void,
  loading: boolean
}
export default function NewAccountForm({
  handleSubmit,
  error,
  newInfo,
  setNewInfo,
  loading}: Props)
{
  const renderErrorMessage = () => {
    if (!error) return null
    return <Alert variant = "danger">{error}</Alert>
  }

  return (
    <div>
      <Card>
        <Card.Body>
          {renderErrorMessage()}
          <Form onSubmit = {handleSubmit}>
            {renderFirstNameSection({personalInfo: newInfo, setPersonalInfo: setNewInfo})}
            {renderLastNameSection({personalInfo: newInfo, setPersonalInfo: setNewInfo})}
            {renderGenderSection({personalInfo: newInfo, setPersonalInfo: setNewInfo})}
            {renderDOBSection({personalInfo: newInfo, setPersonalInfo: setNewInfo})}
            <Button type = "submit" className = "w-100" disabled = {loading}>Submit</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}
