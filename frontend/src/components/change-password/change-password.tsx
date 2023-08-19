import { useState } from "react"
import { Button, Card, Form } from "react-bootstrap"
import { handleChangePassword } from "../../custom-hooks/change-password"
import CurrentPasswordInput from "./current-password-input"
import NewPasswordInput from "./new-password"
import SavedPasswordMessage from "./saved-password-message"

interface Props {
  type: DoctorOrPatient
}

export default function ChangePassword( { type } : { type: DoctorOrPatient }) {
  const [credentials, setCredentials] = useState<ChangePasswordObject>({
    userType: type,
    currentPassword: "",
    newPassword: "",
    newConfirmPassword: "",
  })
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const RenderHideOrShowPassword = () => {
    if (showPassword) return <>Hide Password</>
    return <>Show Password</>
  }

  const handleSubmit = async () => {
    await handleChangePassword(credentials, setCredentials, setMessage, setLoading, type)
  }

  const isShowPassword = () => {
    if (showPassword) return "text"
    return "password"
  }

  return (
    <Card>
      <Card.Body>
        <h2 className = "text-center mb-4">Change Password</h2>
        <Form onSubmit = {(e) => {
          e.preventDefault()
          handleSubmit()
        }}
        >
          <CurrentPasswordInput
            isShowPassword = {isShowPassword()}
            credentials = {credentials}
            setCredentials = {setCredentials}
          />

          <NewPasswordInput
            isShowPassword = {isShowPassword()}
            credentials = {credentials}
            setCredentials = {setCredentials}
          />

          <CurrentPasswordInput
            isShowPassword = {isShowPassword()}
            credentials = {credentials}
            setCredentials = {setCredentials}
          />

          <Button onClick = {() => (setShowPassword(!showPassword))} className = "mt-3">
            <RenderHideOrShowPassword />
          </Button>

          <SavedPasswordMessage message = {message} />

          <Button disabled = {loading} className = "mt-3 w-100" type = "submit">
          Change Password
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}
