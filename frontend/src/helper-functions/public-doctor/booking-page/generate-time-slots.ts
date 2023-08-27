import moment from "moment"
import { convertToMinutes } from "src/utils/time"

const generateTimeSlots = (
	selectedDay: string,
	selectedLocationObject: PublicAddressData,
	selectedServiceObject: ServiceItemNotNullablePrice,
	setAvailableTimes: React.Dispatch<React.SetStateAction<string[]>>,
	setServiceMinutes: React.Dispatch<React.SetStateAction<number>>
): void => {
	// Get the working hours for the selected day
	const selectedDayOfWeek = moment(selectedDay, "dddd, MMMM Do, YYYY").format("dddd")
	const workingHours = selectedLocationObject.times.find(time => time.dayOfWeek === selectedDayOfWeek)

	if (workingHours) {
		const times = []
		const start = workingHours.startTime.split(":")
		const end = workingHours.endTime.split(":")

		let currentTime = moment().hour(Number(start[0])).minute(Number(start[1]))
		const endTime = moment().hour(Number(end[0])).minute(Number(end[1]))

		const ServiceMinutes = convertToMinutes(selectedServiceObject.serviceTime)
		setServiceMinutes(ServiceMinutes)

		while (currentTime.isBefore(endTime)) {
			// Change "HH:mm" to "h:mm A":
			times.push(currentTime.format("h:mm A"))
			currentTime = currentTime.clone().add(ServiceMinutes, "minutes")
		}
		setAvailableTimes(times)
	}
}

export default generateTimeSlots
