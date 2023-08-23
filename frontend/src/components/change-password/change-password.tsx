import { useState } from "react"
import Button from "../button"
import { Card, Form } from "react-bootstrap"
import changePassword from "../../helper-functions/shared/change-password"
import CurrentPasswordInput from "./current-password-input"
import NewPasswordInput from "./new-password"
import SavedPasswordMessage from "./saved-password-message"

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
    if (showPassword) return "Hide Password"
    return "Show Password"
  }

  const handleSubmit = async () => {
    await changePassword(credentials, setCredentials, setMessage, setLoading, type)
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

          <Button
            className = "mt-3"
            colorClass = "bg-orange-600"
            hoverClass = "hover:bg-orange-700"
            title = {RenderHideOrShowPassword()}
            onClick = {() => (setShowPassword(!showPassword))}
          />

          <SavedPasswordMessage message = {message} />

          <Button
            className = "mt-3 w-100"
            colorClass = "bg-emerald-600"
            hoverClass = "hover:bg-emerald-700"
            title = "Change Password"
            disabled = {loading}
          />
        </Form>
      </Card.Body>
    </Card>
  )
}
