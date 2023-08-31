import FormGroup from "../form-group"

function LastNameInput ({ personalInfo, setPersonalInfo }: PersonalInfoProps) {
	return (
		<FormGroup
			id = "lastName"
			label = "Last Name"
			onChange = {event => setPersonalInfo({...personalInfo, lastName: event.target.value})}
			pattern = "[A-Za-z]*"
			placeholder = "Last Name"
			required
			type = "text"
			value = {personalInfo.lastName || ""}
		/>
	)
}

export default LastNameInput
