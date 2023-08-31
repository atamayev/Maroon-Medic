import FormGroup from "../form-group"

function FirstNameInput ({ personalInfo, setPersonalInfo }: PersonalInfoProps) {
	return (
		<FormGroup
			id = "FirstName"
			label = "First Name"
			onChange = {event => setPersonalInfo({...personalInfo, firstName: event.target.value})}
			pattern = "[A-Za-z]*"
			placeholder = "First Name"
			required
			type = "text"
			value = {personalInfo.firstName || ""}
		/>
	)
}

export default FirstNameInput
