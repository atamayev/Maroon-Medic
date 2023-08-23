import { Card, Form, Alert } from "react-bootstrap"
import FirstNameInput from "./personal-info-inputs/first-name-input"
import LastNameInput from "./personal-info-inputs/last-name-input"
import GenderSection from "./personal-info-inputs/gender-input"
import DOBSection from "./date-of-birth/dob-section"
import Button from "./button"

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
            <Button
              className = "w-100"
              colorClass = "bg-yellow-400"
              hoverClass = "hover:bg-yellow-600"
              title = "Submit"
              disabled = {loading}
            />
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}
