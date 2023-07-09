import { Card, Button } from "react-bootstrap"

export default function RenderVerificationSection (props) {
  return (
    <>
      <Card>
        <Card.Header>
          Verification Status
        </Card.Header>
        <Card.Body>
          Account Verification Status:
          {RenderIsVerification(props)}
        </Card.Body>
      </Card>
    </>
  )
}

function RenderIsVerification (props) {
  const { verified } = props
  if (verified) return <Button variant = "success" disabled>✓ (Your identity is Verified) </Button>
  else return <Button variant = "danger" disabled>X (Your identity is Not Verified)</Button>
}
