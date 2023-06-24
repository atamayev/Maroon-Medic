import moment from "moment";
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../styles/calendar.css"
import { NonDoctorAccess } from "../../components/user-type-unauth";
import { FillDoctorCalendarDetails } from "../../custom-hooks/fetch-calendar-details";
import useSimpleUserVerification from "../../custom-hooks/use-simple-user-verification";
import Header from "../header";
import DoctorHeader from "./doctor-header";

const localizer = momentLocalizer(moment);

const CustomEvent = ({ event }) => {
  let CSS 
  if (event.Doctor_confirmation_status === 0) CSS = 'status-pending'
  else CSS = 'status-confirmed'
  return <div className = {CSS}> {event.title} </div>
};

function useDoctorCalendarData(userType) {
  const [events, setEvents] = useState([]);

  const fetchAndSetCalendarData = async () => {
    if (userType === 'Doctor') {
      try {
        const storedCalendarData = sessionStorage.getItem("DoctorCalendarDetails");
        if (!storedCalendarData) FillDoctorCalendarDetails(setEvents);
      } catch(error) {
      }
    }
  };

  useEffect(() => {
    fetchAndSetCalendarData();
  }, [userType]);

  return events;
}

export default function DoctorCalendar() {
  const { userType } = useSimpleUserVerification();
  const events = useDoctorCalendarData(userType);

  if (userType !== 'Doctor') return <NonDoctorAccess/>;

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
  );
};
