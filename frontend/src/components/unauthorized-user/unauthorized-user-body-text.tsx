import {Link} from "react-router-dom"
import {Button, Card} from "react-bootstrap"

interface Props {
  vetOrpatient: vetOrpatient
}

const UnauthorizedUserBodyText = ({vetOrpatient}: Props) => {
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

export default UnauthorizedUserBodyText

