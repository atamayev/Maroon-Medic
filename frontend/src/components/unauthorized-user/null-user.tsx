import {Link} from "react-router-dom"
import {Button, Card} from "react-bootstrap"
import Header from "../header/header"

const NullUser = () => {
  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <Card>
        <Card.Body>
          <p>You are not logged in. Please make an account, or login below</p>
          <Link to = "/patient-register">
            <Button variant = "primary">
              <p>Register</p>
            </Button>
          </Link>
          <Link to = "/patient-login">
            <Button variant = "primary">
              <p>Login</p>
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  )
}

export default NullUser
