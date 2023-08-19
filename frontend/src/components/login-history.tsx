import { Card } from "react-bootstrap"

export default function LoginHistory(
  { loginHistoryItem } :
  {loginHistoryItem: { Login_at: string } }
) {
  return (
    <Card className = "mb-3">
      <Card.Body>
        <Card.Title>Login Time: {loginHistoryItem.Login_at} </Card.Title>
      </Card.Body>
    </Card>
  )
}
