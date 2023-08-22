import { useState, useEffect } from "react"
import moment from "moment"
import { Calendar, momentLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "../../styles/calendar.css"
import retrieveDoctorCalendarData from "src/helper-functions/private-doctor/retrieve-doctor-calendar-data"
import UnauthorizedUser from "../../components/unauthorized-user/unauthorized-user"
import useSimpleUserVerification from "../../custom-hooks/use-simple-user-verification"
import Header from "../../components/header/header"
import DoctorHeader from "./doctor-header"

const localizer = momentLocalizer(moment)

const CustomEvent = ({ event }: {event: DoctorCalendarEvent}) => {
  let CSS
  if (event.Doctor_confirmation_status === false) CSS = "status-pending"
  else CSS = "status-confirmed"
  return <div className = {CSS}> {event.title} </div>
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
      <Header dropdown = {true} />
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
