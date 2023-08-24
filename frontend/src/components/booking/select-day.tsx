import FormGroup from "../form-group"
import handleDayChange from "src/helper-functions/public-doctor/booking-page/handle-day-change"
import AvailableDates from "./available-dates"

interface SelectDayProps {
  selectedService: ServiceItem | null
  selectedLocation: PublicAddressData | null
  setSelectedDay: React.Dispatch<React.SetStateAction<string | null>>
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>
  selectedDay: string | null
  personalData: DoctorPersonalData
  availableDates: string[]
}

const SelectDay = (props: SelectDayProps) => {
	const { selectedService, selectedLocation, setSelectedDay, setSelectedTime, selectedDay, personalData, availableDates } = props
	if (!(selectedService && selectedLocation && selectedDay)) return null

	return (
		<div className="col-md-6">
			<FormGroup
				as="select"
				id="daySelect"
				label="Select a date"
				onChange={(e) => handleDayChange(e, setSelectedDay, setSelectedTime)}
			>
				<option>Select...</option>
				<AvailableDates
					selectedDay = {selectedDay}
					personalData = {personalData}
					availableDates = {availableDates}
				/>
			</FormGroup>
		</div>
	)
}

export default SelectDay
