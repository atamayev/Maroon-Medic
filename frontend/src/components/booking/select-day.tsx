import FormGroup from "../form-group"
import handleDayChange from "src/helper-functions/public-doctor/booking-page/handle-day-change"
import AvailableDates from "./available-dates"

interface SelectDayProps extends AppointmentBookingProps {
	availableDates: string[]
}

export default function SelectDay (props: SelectDayProps) {
	const { appointmentInformation, setAppointmentInformation, availableDates } = props

	if (!(
		appointmentInformation.selectedService &&
		appointmentInformation.selectedLocation &&
		appointmentInformation.selectedPet)
	) return null

	return (
		<div className="col-md-6">
			<FormGroup
				as="select"
				id="daySelect"
				label="Select a date"
				onChange={(e) => handleDayChange(e, setAppointmentInformation)}
				value = {appointmentInformation.selectedDay || ""}
			>
				<option value = "" disabled>Select...</option>
				<AvailableDates
					appointmentInformation = {appointmentInformation}
					availableDates = {availableDates}
				/>
			</FormGroup>
		</div>
	)
}
