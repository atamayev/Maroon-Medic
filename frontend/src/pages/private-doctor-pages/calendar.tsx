import moment from "moment"
import { useEffect, useState } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "../../styles/calendar.css"
import { UnauthorizedUser } from "../../components/user-type-unauth"
import { FillDoctorCalendarDetails } from "../../custom-hooks/fetch-calendar-details"
import useSimpleUserVerification from "../../custom-hooks/use-simple-user-verification"
import Header from "../header"
import DoctorHeader from "./doctor-header"

const localizer = momentLocalizer(moment)

const CustomEvent = ({ event }: {event: DoctorCalendarEvent}) => {
  let CSS
  if (event.Doctor_confirmation_status === false) CSS = "status-pending"
  else CSS = "status-confirmed"
  return <div className = {CSS}> {event.title} </div>
}

function useDoctorCalendarData(userType: DoctorOrPatientOrNull) {
  const [events, setEvents] = useState<DoctorCalendarEvent[]>([])

  const fetchAndSetCalendarData = async () => {
    try {
      const storedCalendarData = sessionStorage.getItem("DoctorCalendarDetails")
      if (!storedCalendarData) await FillDoctorCalendarDetails(setEvents)
    } catch (error) {
    }
  }

  useEffect(() => {
    if (userType !== "Doctor") return
    fetchAndSetCalendarData()
  }, [])

  return events
}

export default function DoctorCalendar() {
  const { userType } = useSimpleUserVerification()
  const events = useDoctorCalendarData(userType)

  if (userType !== "Doctor") return <UnauthorizedUser patientOrDoctor = {"vet"}/>

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
