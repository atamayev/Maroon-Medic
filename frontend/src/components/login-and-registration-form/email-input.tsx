import FormGroup from "../form-group"

interface Props {
  credentials: AuthCredentials,
  setCredentials: (credentials: AuthCredentials) => void,
}

const EmailInput = (props: Props) => {
	const { credentials, setCredentials } = props
	return (
		<FormGroup
			id = "email"
			label = "Username"
			type = "email"
			placeholder = "abc@123.com"
			onChange = {(event) => setCredentials({...credentials, email: event.target.value})}
			required
			value = {credentials.email || ""}
		/>
	)
}

export default EmailInput
