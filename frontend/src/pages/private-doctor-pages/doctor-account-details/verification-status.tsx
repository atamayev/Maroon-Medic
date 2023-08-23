import { Card } from "react-bootstrap"
import Button from "src/components/button"

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

function RenderIsVerification ( {verified} : {verified: boolean}) {
  if (verified) {
    return (
      <Button
        colorClass = "bg-green-500"
        hoverClass = "hover:bg-green-500"
        title = "✓ (Your identity is Verified)"
        disabled
      />
    )
  }
  return (
    <Button
      colorClass = "bg-red-500"
      hoverClass = "hover:bg-red-600"
      title = "X (Your identity is Not Verified)"
    />
  )
}
