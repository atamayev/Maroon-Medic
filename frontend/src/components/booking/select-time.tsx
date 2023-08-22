import moment from "moment"
import FormGroup from "../form-group"
import handleTimeChange from "src/helper-functions/public-doctor/booking-page/handle-time-change"

interface SelectTimeProps {
  selectedService: ServiceItem | null
  selectedLocation: PublicAddressData | null
  selectedDay: string | null
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>
  availableTimes: string[]
  serviceMinutes: number
}

const SelectTime = (props: SelectTimeProps) => {
  const { selectedService, selectedLocation, selectedDay, setSelectedTime, availableTimes, serviceMinutes } = props
  if (!(selectedService && selectedLocation && selectedDay)) return null
  return (
    <div className="col-md-6">
      <FormGroup
        as="select"
        id="timeSelect"
        label="Select a time"
        onChange={(e) => handleTimeChange(e, setSelectedTime)}
      >
        <option>Select...</option>
        {availableTimes.map((time) => (
          <option key={time} value={time}>
            {time} - {moment(time, "h:mm A").add(serviceMinutes, "minutes").format("h:mm A")}
          </option>
        ))}
      </FormGroup>
    </div>
  )
}

export default SelectTime
