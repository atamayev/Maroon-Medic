import { Button } from "react-bootstrap"
import { saveDescription } from "src/custom-hooks/account-details-hooks/save-doctor-account-details"

interface Props {
  description: string
  setDescriptionConfirmation: (conf: ConfirmationMessage) => void
}

const SaveDescriptionButton = (props: Props) => {
  const { description, setDescriptionConfirmation } = props

  return (
    <Button
      variant = "success"
      onClick = {() => saveDescription(description, setDescriptionConfirmation)}
    >
      Save
    </Button>
  )
}

export default SaveDescriptionButton
