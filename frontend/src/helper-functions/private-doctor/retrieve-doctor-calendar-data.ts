import fetchDoctorCalendarDetails from "./fetch-calendar-details"

const retrieveDoctorCalendarData = async (): Promise<DoctorCalendarEvent[]> => {
	try {
		const storedCalendarData = sessionStorage.getItem("DoctorCalendarDetails")
		if (storedCalendarData) return JSON.parse(storedCalendarData)

		// Assuming FillDoctorCalendarDetails is an async function that fetches and returns the calendar details
		const calendarDetails = await fetchDoctorCalendarDetails()
		return calendarDetails!
	} catch (error) {
		console.error(error)
		return []
	}
}

export default retrieveDoctorCalendarData
