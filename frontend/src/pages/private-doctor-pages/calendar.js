import moment from "moment";
import {useEffect, useState, useContext} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../styles/calendar.css"
import { VerifyContext } from "../../contexts/verify-context";
import { NonDoctorAccess } from "../../components/user-type-unauth";
import CalendarDataService from "../../services/calendar-data-service";
import { invalidUserAction } from "../../custom-hooks/user-verification-snippets";
import Header from "../header";
import DoctorHeader from "./doctor-header";

const localizer = momentLocalizer(moment);

const CustomEvent = ({ event }) => {
  let CSS 
  if (event.Doctor_confirmation_status === 0) CSS = 'status-pending'
  else CSS = 'status-confirmed'
  return <div className = {CSS}> {event.title} </div>
};

export default function DoctorCalendar () {
  const {userVerification} = useContext(VerifyContext);
  const [userType, setUserType] = useState(null);
  const [events, setEvents] = useState([]);

  const verifyAndSetCalendarData = async () => {
    const result = await userVerification();
    if (result.verified === true) {
      setUserType(result.userType)
      if (result.userType === 'Doctor') {
        try {
          const storedAccountDetails = sessionStorage.getItem("DoctorCalendarDetails")
          if (!storedAccountDetails) FillDoctorCalendarDetails();
        } catch(error) {
        }
      }
    }
  };

  useEffect(() => {
    verifyAndSetCalendarData()
  }, []);

  async function FillDoctorCalendarDetails() {
    try {
      const response = await CalendarDataService.fillCalendarDetails();
      if (response.status === 200) {
        const events = response.data.map(appointment => {
          const startTime = new Date(appointment.appointment_date);
          const endTime = new Date(startTime);
          endTime.setMinutes(startTime.getMinutes() + parseInt(appointment.Service_time));
          return {
            title: appointment.Service_name,
            start: startTime,
            end: endTime,
            Doctor_confirmation_status: appointment.Doctor_confirmation_status
          };
        });
        setEvents(events);
      }
    } catch(error) {
      if (error.response.status === 401) invalidUserAction(error.response.data)
    }
  }  

  if (userType !== 'Doctor') return <NonDoctorAccess/>

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
