import {Link} from "react-router-dom"
import {Button, Card} from "react-bootstrap"
import Header from "../pages/header"

interface Props {
  vetOrpatient: vetOrpatient
}

export const UnauthorizedUserBodyText = ({vetOrpatient}: Props) => {
  return (
    <Card.Body>
      <p>You are not logged in as a {vetOrpatient}. Please make an account, or login below</p>
      <Link to = {`/${vetOrpatient}-register`}>
        <Button variant = "primary">
          <p>Register</p>
        </Button>
      </Link>
      <Link to = {`/${vetOrpatient}-login`}>
        <Button variant = "primary">
          <p>Login</p>
        </Button>
      </Link>
    </Card.Body>
  )
}

export function UnauthorizedUser(vetOrpatient: Props): JSX.Element {
  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <Card>
        {UnauthorizedUserBodyText(vetOrpatient)}
      </Card>
    </>
  )
}
