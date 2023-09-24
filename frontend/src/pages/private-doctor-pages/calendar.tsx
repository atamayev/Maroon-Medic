import { observer } from "mobx-react"
import dayjs from "dayjs"
import { useEffect, useContext } from "react"
import { Calendar, dayjsLocalizer  } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import UnauthorizedUser from "../../components/unauthorized-user/unauthorized-user"
import DoctorHeader from "./doctor-header"
import AppContext from "src/contexts/maroon-context"
import usefetchDoctorCalendarDetails from "src/custom-hooks/use-fetch-calendar-details"

function CustomEvent ({ event }: { event: DoctorCalendarEvent }) {
	let tailwindCSS = ""
	if (event.doctorConfirmationStatus === false) tailwindCSS = "bg-orange-400"
	else tailwindCSS = "bg-blue-400"

	return <div className={tailwindCSS}> {event.title} </div>
}

function DoctorCalendar() {
	const localizer = dayjsLocalizer(dayjs)
	const appContext = useContext(AppContext)
	const fetchDoctorCalendarDetails = usefetchDoctorCalendarDetails()

	useEffect(() => {
		fetchDoctorCalendarDetails()
	}, [])

	if (appContext.auth.userType !== "Doctor") return <UnauthorizedUser vetOrpatient = {"vet"}/>

	return (
		<div>
			<DoctorHeader />
			<Calendar
				localizer = {localizer}
				defaultDate = {new Date()}
				defaultView = "month"
				events = {appContext.privateDoctorData?.doctorCalendarDetails}
				style = {{ height: "100vh" }}
				components = {{
					event: CustomEvent,
				}}
			/>
		</div>
	)
}

export default observer(DoctorCalendar)
