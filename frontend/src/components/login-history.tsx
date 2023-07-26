import { Card } from "react-bootstrap"

interface Props {
  loginHistoryItem: { Login_at: string }
}

export default function LoginHistory(props: Props) {
  const {loginHistoryItem} = props

  return (
    <Card className = "mb-3">
      <Card.Body>
        <Card.Title>Login Time: {loginHistoryItem.Login_at} </Card.Title>
      </Card.Body>
    </Card>
  )
}
