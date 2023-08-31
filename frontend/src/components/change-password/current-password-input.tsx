import FormGroup from "../form-group"

interface Props {
	isShowPassword: "text" | "password",
	credentials: ChangePasswordObject,
	setCredentials: React.Dispatch<React.SetStateAction<ChangePasswordObject>>
}

export default function CurrentPasswordInput (props: Props) {
	const { isShowPassword, credentials, setCredentials } = props

	return (
		<FormGroup
			id = "current-password"
			label = "Current Password"
			type = {isShowPassword}
			placeholder = "SuperSecretPassword"
			value = {credentials.currentPassword || ""}
			onChange = {(event) => setCredentials({...credentials, currentPassword: event.target.value})}
			required
		/>
	)
}
