import { useEffect, useState, useCallback } from "react"
import { Card, Button, Form } from "react-bootstrap"
import FormGroup from "../../../components/form-group"
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message"
import { saveDescription } from "../../../custom-hooks/account-details-hooks/save-doctor-account-details"
import { RenderMessageSection } from "../../../components/saved-message-section"

interface Props {
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>
}
export default function RenderDescriptionSection (props: Props) {
  return (
    <Card className = "mb-3">
      <Card.Header>
        Description
      </Card.Header>
      <Card.Body>
        <RenderIsDescription {...props} />
      </Card.Body>
    </Card>
  )
}

function RenderIsDescription(props: Props) {
  const { description, setDescription } = props
  const [isDescriptionOverLimit, setIsDescriptionOverLimit] = useState(false)
  const [descriptionConfirmation, setDescriptionConfirmation] = useConfirmationMessage()

  useEffect(() => {
    if (description || description === "") setIsDescriptionOverLimit(description.length >= 1000)
  }, [description])

  const counterStyleLimit = () => {
    if (isDescriptionOverLimit) return {color: "red"}
    return {color: "black"}
  }

  const handleDescriptionChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value)
  }, [setDescription])

  const RenderDescriptionInput = () => {
    return (
      <FormGroup
        id = "Description"
        value = {description}
        onChange = {event => {handleDescriptionChange(event)}}
        maxLength = {1000} // limit to 1000 characters
        as = "textarea"
        rows = {3}
      />
    )
  }

  const RenderCharacterLimit = () => {
    return (
      <div style = {counterStyleLimit()}>
        Character Limit: {description.length} / 1000
      </div>
    )
  }

  const RenderSaveButton = () => {
    return (
      <Button
        variant = "success"
        onClick = {() => saveDescription(description, setDescriptionConfirmation)}
      >
        Save
      </Button>
    )
  }

  return (
    <Form>
      <RenderDescriptionInput />
      <RenderCharacterLimit />
      <RenderSaveButton />
      <RenderMessageSection
        confirmationMessage = {descriptionConfirmation}
        whatIsBeingSaved = "Description"
      />
    </Form>
  )
}
