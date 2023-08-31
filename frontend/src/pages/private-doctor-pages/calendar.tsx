import { useState, useEffect } from "react"
import moment from "moment"
import { Calendar, momentLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import retrieveDoctorCalendarData from "src/helper-functions/private-doctor/retrieve-doctor-calendar-data"
import UnauthorizedUser from "../../components/unauthorized-user/unauthorized-user"
import useSimpleUserVerification from "../../custom-hooks/use-simple-user-verification"
import DoctorHeader from "./doctor-header"

const localizer = momentLocalizer(moment)

function CustomEvent ({ event }: { event: DoctorCalendarEvent }) {
	let tailwindCSS = ""
	if (event.doctorConfirmationStatus === false) tailwindCSS = "bg-orange-400"
	else tailwindCSS = "bg-blue-400"

	return <div className={tailwindCSS}> {event.title} </div>
}

export default function DoctorCalendar() {
	const [events, setEvents] = useState<DoctorCalendarEvent[]>([])
	const { userType } = useSimpleUserVerification()

	useEffect(() => {
		const fetchCalendarData = async () => {
			const calendarData = await retrieveDoctorCalendarData(userType)
			setEvents(calendarData)
		}
		fetchCalendarData()
	}, [])

	if (userType !== "Doctor") return <UnauthorizedUser vetOrpatient = {"vet"}/>

	return (
		<div>
			<DoctorHeader />
			<Calendar
				localizer = {localizer}
				defaultDate = {new Date()}
				defaultView = "month"
				events = {events}
				style = {{ height: "100vh" }}
				components = {{
					event: CustomEvent,
				}}
			/>
		</div>
	)
}
