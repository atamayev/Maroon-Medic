import UnauthorizedUserBodyText from "../unauthorized-user/unauthorized-user-body-text"

export const PatientNotLoggedIn = () => {
  return (
    <div className="mb-4 border border-brown-400 bg-yellow-100 rounded">
      <div className="p-4 bg-amber-400 text-white">Ready to make a booking?</div>
      <UnauthorizedUserBodyText vetOrpatient = {"patient"} />
    </div>
  )
}

export default PatientNotLoggedIn
