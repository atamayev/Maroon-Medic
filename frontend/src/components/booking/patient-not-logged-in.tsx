import { Card } from "react-bootstrap"
import UnauthorizedUserBodyText from "../unauthorized-user/unauthorized-user-body-text"

export const PatientNotLoggedIn = () => {
  return (
    <Card className = "card-bottom-margin">
      <Card.Header>Ready to make a booking?</Card.Header>
      <UnauthorizedUserBodyText vetOrpatient = {"patient"} />
    </Card>
  )
}

export default PatientNotLoggedIn
