import _ from "lodash"
import { Card } from "react-bootstrap"

const DoctorDoesNotOfferServices = (personalData: DoctorPersonalData) => {
  return (
    <Card className="card-bottom-margin">
      <Card.Header>Ready to make a booking?</Card.Header>
      <Card.Body>Dr. {_.upperFirst(personalData.LastName || "")} does not currently offer any services.</Card.Body>
    </Card>
  )
}

export default DoctorDoesNotOfferServices
