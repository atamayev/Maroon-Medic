import {Link} from "react-router-dom"
import {Button, Card} from "react-bootstrap"
import Header from "../pages/header"

export const UnauthorizedUserBodyText = ({patientOrDoctor}) => {
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

export function UnauthorizedUser(patientOrDoctor) {
  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <Card>
        {UnauthorizedUserBodyText(patientOrDoctor)}
      </Card>
    </>
  )
}
