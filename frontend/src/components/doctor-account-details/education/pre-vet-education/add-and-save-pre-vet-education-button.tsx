
import { Button } from "react-bootstrap"

interface Props {
  handleAddEducation: () => GeneralEducationItem
  saveEducation: (selectedEducationObj: PreVetEducationItem) => void
  allChoicesFilled: boolean
}

const AddAndSavePreVetEducationButton = (props: Props) => {
  const { handleAddEducation, saveEducation, allChoicesFilled } = props

  if (!allChoicesFilled) return null

  return (
    <Button
      onClick = {() => {
        const selectedEducationObj = handleAddEducation()
        saveEducation(selectedEducationObj as PreVetEducationItem)
      }}
    >
      Add
    </Button>
  )
}

export default AddAndSavePreVetEducationButton
