import { Link } from "react-router-dom"
import Button from "../button"

function NullUser () {
	return (
		<div className="mb-3 bg-yellow-100 border border-brown-400 rounded p-4">
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
		</div>
	)
}

export default NullUser
