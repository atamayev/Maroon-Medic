import _ from "lodash"
import { Card } from "react-bootstrap"

const NoLocationHasTimes = ({ personalData }: {personalData: DoctorPersonalData}) => {
  return (
    <Card className = "card-bottom-margin">
      <Card.Header>Ready to make a booking?</Card.Header>
      <Card.Body>
        Dr. {_.upperFirst(personalData.LastName || "")} does not currently have any open time slots for appointments.
      </Card.Body>
    </Card>
  )
}

export default NoLocationHasTimes
