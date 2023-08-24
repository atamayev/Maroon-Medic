import FormGroup from "../form-group"

interface Props {
  isShowPassword: "text" | "password",
  credentials: ChangePasswordObject,
  setCredentials: React.Dispatch<React.SetStateAction<ChangePasswordObject>>
}

const NewPasswordInput = (props: Props) => {
	const { isShowPassword, credentials, setCredentials } = props

	return (
		<FormGroup
			id = "new-password"
			label = "New Password"
			type = {isShowPassword}
			placeholder = "NewSuperSecretPassword"
			value = {credentials.newPassword || ""}
			onChange = {(event) => setCredentials({...credentials, newPassword: event.target.value})}
			required
		/>
	)
}

export default NewPasswordInput
