import { Link } from "react-router-dom"
import Button from "../button"

function UnauthorizedUserBodyText ({ vetOrpatient }: { vetOrpatient: vetOrpatient }) {
	return (
		<div className="bg-yellow-100 border border-brown-400 rounded p-4">
			<p>You are not logged in as a {vetOrpatient}. Please make an account, or login below</p>
			<Link to = {`/${vetOrpatient}-register`}>
				<Button
					className = "mt-3 mr-3"
					colorClass = "bg-green-600"
					hoverClass = "hover:bg-green-700"
					title = "Register"
					textColor = "text-white"
				/>
			</Link>
			<Link to = {`/${vetOrpatient}-login`}>
				<Button
					className = "ml-3 mt-3"
					colorClass = "bg-green-600"
					hoverClass = "hover:bg-green-700"
					title = "Login"
					textColor = "text-white"
				/>
			</Link>
		</div>
	)
}

export default UnauthorizedUserBodyText

