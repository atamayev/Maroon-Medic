import { Link } from "react-router-dom"
import Button from "../button"

interface Props {
  vetOrpatient: vetOrpatient
}

const UnauthorizedUserBodyText = ({vetOrpatient}: Props) => {
  return (
    <div className="bg-yellow-100 border border-brown-400 rounded p-4">
      <p>You are not logged in as a {vetOrpatient}. Please make an account, or login below</p>
      <Link to = {`/${vetOrpatient}-register`}>
        <Button
          colorClass = "bg-green-600"
          hoverClass = "hover:bg-green-700"
          title = "Register"
        />
      </Link>
      <Link to = {`/${vetOrpatient}-login`}>
        <Button
          colorClass = "bg-green-600"
          hoverClass = "hover:bg-green-700"
          title = "Login"
        />
      </Link>
    </div>
  )
}

export default UnauthorizedUserBodyText

