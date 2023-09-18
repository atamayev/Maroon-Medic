import { observer } from "mobx-react"
import { useContext, useEffect, useState } from "react"
import Button from "src/components/button"
import { useNavigate, useLocation } from "react-router-dom"
import UnauthorizedUser from "../../components/unauthorized-user/unauthorized-user"
import useConfirmBooking from "../../custom-hooks/public-doctor/use-confirm-booking"
import DoctorPersonalInfo from "src/components/finalize-booking/doctor-personal-info"
import CustomPatientMessage from "src/components/finalize-booking/custom-patient-message"
import FinalizeBookingCardText from "src/components/finalize-booking/finalize-booking-card-text"
import retrieveFromSessionStorage from "src/utils/retrieve-from-session-storage"
import { AppContext } from "src/contexts/maroon-context"

// eslint-disable-next-line max-lines-per-function
function FinalizeBookingPage() {
	const { userType } = useContext(AppContext)
	const [message, setMessage] = useState("")
	const [isMessageOverLimit, setIsMessageOverLimit] = useState(false)
	const browserLocation = useLocation()
	const navigate = useNavigate()

	let appointmentInformation: AppointmentInformation = {} as AppointmentInformation
	let serviceMinutes: number = -1
	let personalData: DoctorPersonalData = {firstName: "", lastName: "", gender: "", nvi: -1}

	const bookingDetails = retrieveFromSessionStorage("bookingDetails")

	if (browserLocation.state) {
		({ appointmentInformation, serviceMinutes, personalData } = browserLocation.state)
	} else if (bookingDetails) {
		({ appointmentInformation, serviceMinutes, personalData } = bookingDetails)
	}

	useEffect(() => {
		if (!browserLocation.state  && !bookingDetails) {
			window.location.href = "/"
		}
	}, [browserLocation])

	// Ensures that the user is not able to navigate back to finalize booking right after making an appointment
	useEffect(() => {
		if ((browserLocation.state && browserLocation.state.finalized) || !bookingDetails) {
			navigate("/dashboard")
		}
	}, [browserLocation, bookingDetails])

	useEffect(() => {
		if (message) setIsMessageOverLimit(message.length >= 100)
	}, [message])

	if (!browserLocation.state && !bookingDetails) {
		//Or show some kind of loading spinner
		return null
	}

	if (userType !== "Patient") return <UnauthorizedUser vetOrpatient = {"patient"}/>

	function ConfirmOrRequestBook () {
		if (appointmentInformation.selectedLocation?.instantBook) return "Confirm"
		return "Request"
	}

	function ConfirmBookingButton () {
		const confirmBooking = useConfirmBooking()
		return (
			<Button
				colorClass = "bg-green-600"
				hoverClass = "hover:bg-green-700"
				title = {ConfirmOrRequestBook()}
				onClick = {() => {
					confirmBooking({
						appointmentInformation,
						serviceMinutes,
						personalData,
						message
					})
				}}
				textColor = "text-white"
			/>
		)
	}

	return (
		<div className = "container mt-5">
			<div className="bg-white border border-gray-300 rounded p-4 mb-4">
				<div className="border-b pb-2 mb-4">
					<h2>{ConfirmOrRequestBook()} an Appointment</h2>
				</div>
				<div className="p-4">
					<h3>
						<DoctorPersonalInfo personalData={personalData} />
					</h3>
					<FinalizeBookingCardText
						appointmentInformation={appointmentInformation}
						serviceMinutes={serviceMinutes}
					/>
					<CustomPatientMessage
						message={message}
						setMessage={setMessage}
						isMessageOverLimit={isMessageOverLimit}
						personalData={personalData}
					/>
					<ConfirmBookingButton />
				</div>
			</div>
		</div>
	)
}

export default observer(FinalizeBookingPage)
