import FormGroup from "../form-group"
import handleDayChange from "src/helper-functions/public-doctor/booking-page/handle-day-change"
import AvailableDates from "./available-dates"

interface SelectDayProps extends AppointmentBookingProps {
  personalData: DoctorPersonalData
  availableDates: string[]
}

const SelectDay = (props: SelectDayProps) => {
	const { appointmentInformation, setAppointmentInformation, personalData, availableDates } = props
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
					personalData = {personalData}
					availableDates = {availableDates}
				/>
			</FormGroup>
		</div>
	)
}

export default SelectDay
