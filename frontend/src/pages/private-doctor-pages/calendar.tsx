import moment from "moment"
import { Calendar, momentLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "../../styles/calendar.css"
import { useDoctorCalendarData } from "src/custom-hooks/calendar"
import { UnauthorizedUser } from "../../components/user-type-unauth"
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
  const { userType } = useSimpleUserVerification()
  const events = useDoctorCalendarData(userType)

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
