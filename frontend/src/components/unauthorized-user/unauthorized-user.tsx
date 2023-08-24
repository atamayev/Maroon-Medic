import Header from "../header/header"
import UnauthorizedUserBodyText from "./unauthorized-user-body-text"

interface Props {
  vetOrpatient: vetOrpatient
}

export default function UnauthorizedUser(vetOrpatient: Props): JSX.Element {
	return (
		<>
			<Header dropdown = {true} search = {true}/>
			<div className="bg-yellow-100 border border-brown-400 rounded p-4">
				{UnauthorizedUserBodyText(vetOrpatient)}
			</div>
		</>
	)
}
