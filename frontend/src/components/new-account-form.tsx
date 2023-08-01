import { Card, Button, Form, Alert } from "react-bootstrap"
import { RenderFirstNameSection, RenderLastNameSection, RenderGenderSection, RenderDOBSection } from "./personal-info-inputs"

interface Props {
  handleSubmit: () => void,
  error: string,
  newInfo: PersonalInfoType,
  setNewInfo: (newInfo: PersonalInfoType) => void,
  loading: boolean
}

export default function NewAccountForm({
  handleSubmit,
  error,
  newInfo,
  setNewInfo,
  loading}: Props)
{
  const RenderErrorMessage = () => {
    if (!error) return null
    return <Alert variant = "danger">{error}</Alert>
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <RenderErrorMessage />
          <Form onSubmit = {handleSubmit}>
            <RenderFirstNameSection personalInfo = {newInfo} setPersonalInfo = {setNewInfo} />
            <RenderLastNameSection personalInfo = {newInfo} setPersonalInfo = {setNewInfo} />
            <RenderGenderSection personalInfo = {newInfo} setPersonalInfo = {setNewInfo} />
            <RenderDOBSection personalInfo = {newInfo} setPersonalInfo = {setNewInfo} />
            <Button type = "submit" className = "w-100" disabled = {loading}>Submit</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}
