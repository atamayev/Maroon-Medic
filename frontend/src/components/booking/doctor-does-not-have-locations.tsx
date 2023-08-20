import _ from "lodash"
import { Card } from "react-bootstrap"

export const DoctorDoesNotHaveLocations = ({ personalData } : { personalData: DoctorPersonalData }) => {
  return (
    <Card className="card-bottom-margin">
      <Card.Header>Ready to make a booking?</Card.Header>
      <Card.Body>Dr. {_.upperFirst(personalData.LastName || "")} does not currently have any open locations.</Card.Body>
    </Card>
  )
}

export default DoctorDoesNotHaveLocations
