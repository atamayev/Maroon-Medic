import FormGroup from "../form-group"

interface Props {
  credentials: AuthCredentials,
  setCredentials: (credentials: AuthCredentials) => void,
  showPassword: "text" | "password",
}

const PasswordInput = (props: Props) => {
	const { credentials, setCredentials, showPassword } = props

	return (
		<FormGroup
			id = "password"
			label = "Password"
			type = {showPassword}
			placeholder = "Password"
			onChange = {(event) => setCredentials({...credentials, password: event.target.value})}
			required
			value = {credentials.password || ""}
		/>
	)
}

export default PasswordInput
