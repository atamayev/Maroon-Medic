import dayjs from "dayjs"
import FormGroup from "../form-group"
import handleTimeChange from "src/helper-functions/public-doctor/booking-page/handle-time-change"

interface SelectTimeProps {
	appointmentInformation: AppointmentInformation
	setAppointmentInformation: React.Dispatch<React.SetStateAction<AppointmentInformation>>
	availableTimes: string[]
	serviceMinutes: number
}

export default function SelectTime (props: SelectTimeProps) {
	const { appointmentInformation, setAppointmentInformation, availableTimes, serviceMinutes } = props

	if (!(
		appointmentInformation.selectedService &&
		appointmentInformation.selectedLocation &&
		appointmentInformation.selectedDay)
	) return null

	return (
		<div className="col-md-6">
			<FormGroup
				as="select"
				id="timeSelect"
				label="Select a time"
				onChange={(e) => handleTimeChange(e, setAppointmentInformation)}
				value = {appointmentInformation.selectedTime || ""}
			>
				<option value = "" disabled>Select...</option>
				{availableTimes.map((time) => (
					<option key={time} value={time}>
						{time} - {dayjs(time, "h:mm A").add(serviceMinutes, "minute").format("h:mm A")}
					</option>
				))}
			</FormGroup>
		</div>
	)
}
