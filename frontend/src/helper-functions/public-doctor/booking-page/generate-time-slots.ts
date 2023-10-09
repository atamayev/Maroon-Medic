import _ from "lodash"
import dayjs from "dayjs"
import { convertToMinutes } from "src/utils/time"

const generateTimeSlots = (
	selectedDay: string,
	selectedLocationObject: PublicAddressData,
	selectedServiceObject: ServiceItemNotNullablePrice,
	setAvailableTimes: React.Dispatch<React.SetStateAction<string[]>>,
	setServiceMinutes: React.Dispatch<React.SetStateAction<number>>
): void => {
	// Get the working hours for the selected day
	const selectedDayOfWeek = dayjs(selectedDay, "dddd, MMMM D, YYYY").format("dddd")
	const workingHours = selectedLocationObject.times.find(time => time.dayOfWeek === selectedDayOfWeek)

	if (!_.isUndefined(workingHours)) {
		const times = []
		const start = workingHours.startTime.split(":")
		const end = workingHours.endTime.split(":")

		let currentTime = dayjs().hour(Number(start[0])).minute(Number(start[1]))
		const endTime = dayjs().hour(Number(end[0])).minute(Number(end[1]))

		const serviceMinutes = convertToMinutes(selectedServiceObject.serviceTime)
		setServiceMinutes(serviceMinutes)

		while (currentTime.isBefore(endTime)) {
			// Change "HH:mm" to "h:mm A":
			times.push(currentTime.format("h:mm A"))
			currentTime = currentTime.clone().add(serviceMinutes, "minutes")
		}
		setAvailableTimes(times)
	}
}

export default generateTimeSlots
