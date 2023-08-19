import { Alert } from "react-bootstrap"

const SavedPasswordMessage = ( { message } : {message: string}) => {
  if (!message) return null
  if (message === "Password changed successfully") return <Alert variant = "success" className = "mt-3 mb-0">{message}</Alert>
  return <Alert variant = "danger" className = "mt-3 mb-0">{message}</Alert>
}

export default SavedPasswordMessage
