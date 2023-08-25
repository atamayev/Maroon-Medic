import { useEffect, useState } from "react"
import Button from "src/components/button"
import { useNavigate, useLocation } from "react-router-dom"
import UnauthorizedUser from "../../components/unauthorized-user/unauthorized-user"
import useSimpleUserVerification from "../../custom-hooks/use-simple-user-verification"
import useConfirmBooking from "../../custom-hooks/public-doctor/use-confirm-booking"
import DoctorPersonalInfo from "src/components/finalize-booking/doctor-personal-info"
import CustomPatientMessage from "src/components/finalize-booking/custom-patient-message"
import FinalizeBookingCardText from "src/components/finalize-booking/finalize-booking-card-text"

// eslint-disable-next-line max-lines-per-function
export default function FinalizeBookingPage() {
	const [message, setMessage] = useState("")
	const [isMessageOverLimit, setIsMessageOverLimit] = useState(false)
	const browserLocation = useLocation()
	const navigate = useNavigate()
	const { userType } = useSimpleUserVerification(false)

	let selectedService: ServiceItemNotNullablePrice = {Service_name: "", Service_price: -1,
		service_and_category_listID: -1, Category_name: "", Service_time: ""}
	let selectedLocation: PublicAddressData = {address_title: "", address_line_1: "", address_line_2: "", instant_book: false,
		addressesID: -1, city: "", state: "", zip: "", country: "", address_priority: -1, phone: "", times: []}
	let selectedDay: string = ""
	let selectedTime: string = ""
	let serviceMinutes: number = -1
	let personalData: DoctorPersonalData = {FirstName: "", LastName: "", Gender: "", NVI: -1}
	let selectedPet: SavedPetItem = {Name: "", Gender: "", DOB: "", Pet: "", Pet_type: "", insuranceName: "", pet_infoID: -1}

	const storedData = sessionStorage.getItem("bookingDetails")
	const parsedData = storedData && JSON.parse(storedData)
	const sessionBookingDetails = parsedData

	if (browserLocation.state) {
		({ selectedService, selectedLocation, selectedDay, selectedTime,
			serviceMinutes, personalData, selectedPet } = browserLocation.state)
	} else if (sessionBookingDetails) {
		({ selectedService, selectedLocation, selectedDay, selectedTime,
			serviceMinutes, personalData, selectedPet } = sessionBookingDetails)
	}

	useEffect(() => {
		if (!browserLocation.state  && !sessionBookingDetails) {
			window.location.href = "/"
		}
	}, [browserLocation])

	// Ensures that the user is not able to navigate back to finalize booking right after making an appointment
	useEffect(() => {
		if ((browserLocation.state && browserLocation.state.finalized) || !sessionBookingDetails) {
			navigate("/dashboard")
		}
	}, [browserLocation, navigate, sessionBookingDetails])

	useEffect(() => {
		if (message) setIsMessageOverLimit(message.length >= 100)
	}, [message])

	if (!browserLocation.state && !sessionBookingDetails) {
		//Or show some kind of loading spinner
		return null
	}

	if (userType !== "Patient") return <UnauthorizedUser vetOrpatient = {"patient"}/>

	const ConfirmOrRequestBook = () => {
		if (selectedLocation.instant_book) return "Confirm"
		return "Request"
	}

	const ConfirmBookingButton = () => {
		return (
			<>
				<Button
					colorClass = "bg-green-600"
					hoverClass = "hover:bg-green-700"
					title = {ConfirmOrRequestBook()}
					onClick = {() => {
						useConfirmBooking(
							selectedService,
							selectedLocation,
							selectedDay,
							selectedTime,
							serviceMinutes,
							personalData,
							selectedPet,
							message
						)
					}}
				/>
			</>
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
						selectedService={selectedService}
						selectedLocation={selectedLocation}
						selectedDay={selectedDay}
						selectedTime={selectedTime}
						serviceMinutes={serviceMinutes}
						selectedPet={selectedPet}
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
