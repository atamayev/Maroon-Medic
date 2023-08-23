import { Link} from "react-router-dom"
import { Card } from "react-bootstrap"
import Header from "../header/header"
import Button from "../button"

const NullUser = () => {
  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <Card>
        <Card.Body>
          <p>You are not logged in. Please make an account, or login below</p>
          <Link to = "/patient-register">
            <Button
              colorClass = "bg-green-600"
              hoverClass = "hover:bg-green-700"
              title = "Register"
            />
          </Link>
          <Link to = "/patient-login">
            <Button
              colorClass = "bg-green-600"
              hoverClass = "hover:bg-green-700"
              title = "Login"
            />
          </Link>
        </Card.Body>
      </Card>
    </>
  )
}

export default NullUser
