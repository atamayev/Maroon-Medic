import Button from "src/components/button"
import saveDescription from "src/helper-functions/account-details/save/doctor-account-details/save-description"

interface Props {
  description: string
  setDescriptionConfirmation: (conf: ConfirmationMessage) => void
}

const SaveDescriptionButton = (props: Props) => {
  const { description, setDescriptionConfirmation } = props

  return (
    <Button
      className = "mt-3"
      colorClass = "bg-green-600"
      hoverClass = "hover:bg-green-700"
      title = "Save"
      onClick = {() => saveDescription(description, setDescriptionConfirmation)}
    />
  )
}

export default SaveDescriptionButton
