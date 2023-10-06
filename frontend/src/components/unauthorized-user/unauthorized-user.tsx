import UnauthorizedUserBodyText from "./unauthorized-user-body-text"

interface Props {
	vetOrpatient: vetOrpatient
}

export default function UnauthorizedUser(props: Props): JSX.Element {
	const { vetOrpatient } = props

	return (
		<>
			<div className="bg-yellow-100 border border-brown-400 rounded p-4">
				<UnauthorizedUserBodyText vetOrpatient = {vetOrpatient} />
			</div>
		</>
	)
}
