
import { Button } from "react-bootstrap"

interface Props {
  handleAddEducation: () => GeneralEducationItem
  saveVetEducation: (selectedEducationObj: VetEducationItem) => void
  allChoicesFilled: boolean
}

const AddAndSaveVetEducationButton = (props: Props) => {
  const { handleAddEducation, saveVetEducation, allChoicesFilled } = props

  if (!allChoicesFilled) return null

  return (
    <Button
      onClick = {() => {
        const selectedEducationObj = handleAddEducation()
        saveVetEducation(selectedEducationObj as VetEducationItem)
      }}
    >
      Add
    </Button>
  )
}

export default AddAndSaveVetEducationButton
