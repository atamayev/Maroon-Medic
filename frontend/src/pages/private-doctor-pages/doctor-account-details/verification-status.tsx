import { Card, Button } from "react-bootstrap"

interface Props {
  verified: boolean
}
export default function RenderVerificationSection (props: Props) {
  return (
    <>
      <Card>
        <Card.Header>
          Verification Status
        </Card.Header>
        <Card.Body>
          Account Verification Status:
          <RenderIsVerification {...props} />
        </Card.Body>
      </Card>
    </>
  )
}

function RenderIsVerification (props: Props) {
  const { verified } = props
  if (verified) return <Button variant = "success" disabled>✓ (Your identity is Verified) </Button>
  else return <Button variant = "danger" disabled>X (Your identity is Not Verified)</Button>
}
