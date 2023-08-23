
import Button from "src/components/button"

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
      className = "mt-3"
      colorClass = "bg-green-600"
      hoverClass = "hover:bg-green-700"
      title = "Add"
      onClick = {() => {
        const selectedEducationObj = handleAddEducation()
        saveEducation(selectedEducationObj as PreVetEducationItem)
      }}
    />
  )
}

export default AddAndSavePreVetEducationButton
