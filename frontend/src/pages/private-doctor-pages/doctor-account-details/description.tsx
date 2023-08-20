import { useEffect, useState } from "react"
import { Card, Form } from "react-bootstrap"
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import DescriptionInput from "src/components/doctor-account-details/description/description-input"
import SaveDescriptionButton from "src/components/doctor-account-details/description/save-description-button"
import DescriptionCharacterLimit from "src/components/doctor-account-details/description/character-limit"

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

  return (
    <Form>
      <DescriptionInput
        description = {description}
        setDescription = {setDescription}
      />

      <DescriptionCharacterLimit
        description = {description}
        isDescriptionOverLimit = {isDescriptionOverLimit}
      />

      <SaveDescriptionButton
        description = {description}
        setDescriptionConfirmation = {setDescriptionConfirmation}
      />
      <SavedConfirmationMessage
        confirmationMessage = {descriptionConfirmation}
        whatIsBeingSaved = "Description"
      />
    </Form>
  )
}
