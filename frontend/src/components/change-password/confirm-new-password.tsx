import FormGroup from "../form-group"

interface Props {
  isShowPassword: "text" | "password",
  credentials: ChangePasswordObject,
  setCredentials: React.Dispatch<React.SetStateAction<ChangePasswordObject>>
}

const ConfirmNewPasswordInput = (props: Props) => {
  const { isShowPassword, credentials, setCredentials } = props

  return (
    <FormGroup
      id = "confirm-new-password"
      label = "Confirm New Password"
      type = {isShowPassword}
      placeholder = "NewSuperSecretPassword"
      value = {credentials.newConfirmPassword || ""}
      onChange = {(event) => setCredentials({...credentials, newConfirmPassword: event.target.value})}
      required
    />
  )
}

export default ConfirmNewPasswordInput
