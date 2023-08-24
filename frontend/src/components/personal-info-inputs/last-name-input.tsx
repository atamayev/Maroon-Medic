import FormGroup from "../form-group"

const LastNameInput = ({ personalInfo, setPersonalInfo }: PersonalInfoProps) => {
  return (
    <FormGroup
      id = "LastName"
      label = "Last Name"
      onChange = {event => setPersonalInfo({...personalInfo, LastName: event.target.value})}
      pattern = "[A-Za-z]*"
      placeholder = "Last Name"
      required
      type = "text"
      value = {personalInfo.LastName || ""}
    />
  )
}

export default LastNameInput
