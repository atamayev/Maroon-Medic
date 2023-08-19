import { Card, Button, Form, Alert } from "react-bootstrap"
import FirstNameInput from "./personal-info-inputs/first-name-input"
import LastNameInput from "./personal-info-inputs/last-name-input"
import GenderSection from "./personal-info-inputs/gender-input"
import DOBSection from "./date-of-birth/dob-section"

interface Props {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  error: string,
  newInfo: BirthDateInfo,
  setNewInfo: (newInfo: BirthDateInfo) => void,
  loading: boolean
}

export default function NewAccountForm({
  handleSubmit,
  error,
  newInfo,
  setNewInfo,
  loading
} : Props
) {
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
            <FirstNameInput personalInfo = {newInfo} setPersonalInfo = {setNewInfo} />
            <LastNameInput personalInfo = {newInfo} setPersonalInfo = {setNewInfo} />
            <GenderSection personalInfo = {newInfo} setPersonalInfo = {setNewInfo} />
            <DOBSection personalInfo = {newInfo} setPersonalInfo = {setNewInfo} />
            <Button type = "submit" className = "w-100" disabled = {loading}>Submit</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}
