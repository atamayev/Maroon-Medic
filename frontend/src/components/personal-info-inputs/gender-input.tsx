import FormGroup from "../form-group"

const GenderSection = ({personalInfo, setPersonalInfo}: PersonalInfoProps) => {
  return (
    <FormGroup
      as = "select"
      id = "Gender"
      label = "Gender:"
      required = {true}
      value = {personalInfo.Gender || ""}
      onChange = {(event) => setPersonalInfo({...personalInfo, Gender: event.target.value})}
    >
      <option value = "" disabled>Select</option>
      <option value = "Female">Female</option>
      <option value = "Male">Male</option>
      <option value = "Other">Other</option>
    </FormGroup>
  )
}

export default GenderSection
