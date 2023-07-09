import { useState } from "react"
import { Alert, Button, Card, Form  } from "react-bootstrap"
import { handleChangePassword } from "../custom-hooks/change-password"
import FormGroup from "./form-group"

export default function ChangePassword(props) {
  const { type } = props
  const [credentials, setCredentials] = useState({userType: type})
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const renderHideOrShowPassword = () => {
    if (showPassword) return "Hide Password"
    return "Show Password"
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    handleChangePassword(credentials, setCredentials, setMessage, setLoading, type)
  }

  const renderMessage = () => {
    if (!message) return null
    if (message === "Password changed successfully") return <Alert variant = "success" className = "mt-3 mb-0">{message}</Alert>
    return <Alert variant = "danger" className = "mt-3 mb-0">{message}</Alert>
  }

  const renderShowPassword = () => {
    if (showPassword) return "text"
    return "password"
  }

  return (
    <Card>
      <Card.Body>
        <h2 className = "text-center mb-4">Change Password</h2>
        <Form onSubmit = {handleSubmit}>
          <FormGroup
            id = "current-password"
            label = "Current Password"
            type = {renderShowPassword()}
            placeholder = "SuperSecretPassword"
            value = {credentials.currentPassword || ""}
            onChange = {(event) => setCredentials({...credentials, currentPassword: event.target.value})}
            required
          />

          <FormGroup
            id = "new-password"
            label = "New Password"
            type = {renderShowPassword()}
            placeholder = "NewSuperSecretPassword"
            value = {credentials.newPassword || ""}
            onChange = {(event) => setCredentials({...credentials, newPassword: event.target.value})}
            required
          />

          <FormGroup
            id = "confirm-new-password"
            label = "Confirm New Password"
            type = {renderShowPassword()}
            placeholder = "NewSuperSecretPassword"
            value = {credentials.newConfirmPassword || ""}
            onChange = {(event) => setCredentials({...credentials, newConfirmPassword: event.target.value})}
            required
          />

          <Button onClick = {e => (setShowPassword(!showPassword))} className = "mt-3">
          {renderHideOrShowPassword()}
          </Button>

          {renderMessage()}

          <Button disabled = {loading} className = "mt-3 w-100" type = "submit">
          Change Password
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}
