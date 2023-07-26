import {Link} from "react-router-dom"
import {Button, Card} from "react-bootstrap"
import Header from "../pages/header"

type PatientOrDoctor = "patient" | "vet"

interface Props {
  patientOrDoctor: PatientOrDoctor
}

export const UnauthorizedUserBodyText = ({patientOrDoctor}: Props) => {
  return (
    <Card.Body>
      <p>You are not logged in as a {patientOrDoctor}. Please make an account, or login below</p>
      <Link to = {`/${patientOrDoctor}-register`}>
        <Button variant = "primary">
          <p>Register</p>
        </Button>
      </Link>
      <Link to = {`/${patientOrDoctor}-login`}>
        <Button variant = "primary">
          <p>Login</p>
        </Button>
      </Link>
    </Card.Body>
  )
}

export function UnauthorizedUser(patientOrDoctor: Props): JSX.Element {
  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <Card>
        {UnauthorizedUserBodyText(patientOrDoctor)}
      </Card>
    </>
  )
}
