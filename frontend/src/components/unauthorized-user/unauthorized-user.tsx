import { Card } from "react-bootstrap"
import Header from "../header/header"
import UnauthorizedUserBodyText from "./unauthorized-user-body-text"

interface Props {
  vetOrpatient: vetOrpatient
}

export default function UnauthorizedUser(vetOrpatient: Props): JSX.Element {
  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <Card>
        {UnauthorizedUserBodyText(vetOrpatient)}
      </Card>
    </>
  )
}
