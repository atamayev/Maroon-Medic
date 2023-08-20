import FormGroup from "src/components/form-group"
import { useCallback } from "react"

interface Props {
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>
}

const DescriptionInput = (props: Props) => {
  const { description, setDescription } = props

  const handleDescriptionChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value)
  }, [setDescription])

  return (
    <FormGroup
      id = "Description"
      value = {description}
      onChange = {event => {handleDescriptionChange(event)}}
      maxLength = {1000}
      as = "textarea"
      rows = {3}
    />
  )
}

export default DescriptionInput
