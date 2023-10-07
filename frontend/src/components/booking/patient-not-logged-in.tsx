import UnauthorizedUserBodyText from "../unauthorized-user/unauthorized-user-body-text"

export default function PatientNotLoggedIn () {
	return (
		<div className="mb-4 border border-brown-400 bg-yellow-100 rounded">
			<div className="p-4 bg-amber-400 text-black text-center">Ready to make a booking?</div>
			<UnauthorizedUserBodyText vetOrpatient = {"patient"} />
		</div>
	)
}
