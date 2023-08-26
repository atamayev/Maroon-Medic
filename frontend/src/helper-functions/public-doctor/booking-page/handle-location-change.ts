import _ from "lodash"

const handleLocationChange = (
	event: React.ChangeEvent<HTMLInputElement>,
	addresses: PublicAddressData[],
	setAppointmentInformation: React.Dispatch<React.SetStateAction<AppointmentInformation>>,
	setNoAvailableTimesMessage: React.Dispatch<React.SetStateAction<boolean>>
): void => {
	const value = event.target.value
	const selectedLocationObject = addresses.find(location => location.addressesID.toString() === value)

	if (value === "Select...") {
		setAppointmentInformation(prev => ({
			...prev,
			selectedLocation: null,
			selectedDay: null,
			selectedTime: null,
		}))
		setNoAvailableTimesMessage(false)
	} else if (_.isEmpty(selectedLocationObject?.times)) {
		setNoAvailableTimesMessage(true)
		setAppointmentInformation(prev => ({
			...prev,
			selectedLocation: null,
			selectedTime: null,
		}))
	} else {
		setNoAvailableTimesMessage(false)
		setAppointmentInformation(prev => ({
			...prev,
			selectedLocation: selectedLocationObject!
		}))
	}
}

export default handleLocationChange
