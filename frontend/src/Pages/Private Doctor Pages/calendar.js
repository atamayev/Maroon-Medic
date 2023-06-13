import React, {useEffect, useState, useContext} from "react";
import { VerifyContext } from "../../Contexts/VerifyContext";
import { NonDoctorAccess } from "../../Components/user-type-unauth";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Header from "../header";
import DoctorHeader from "./doctor-header";
import CalendarDataService from "../../Services/calendar-data-service";
import "./calendar.css";

const localizer = momentLocalizer(moment);

const CustomEvent = ({ event }) => {
  let CSS 
  if (event.Doctor_confirmation_status === 0) CSS = 'status-pending'
  else CSS = 'status-confirmed'
  return <div className = {CSS}> {event.title} </div>
};

export default function DoctorCalendar () {
  const {user_verification} = useContext(VerifyContext);
  const [user_type, setUser_type] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
      user_verification()
      .then(result => {
        if (result.verified === true) {
          setUser_type(result.user_type)
          if (result.user_type === 'Doctor') {
            try {
              const storedAccountDetails = sessionStorage.getItem("DoctorCalendarDetails")
              if (!storedAccountDetails) FillDoctorCalendarDetails();
            } catch(error) {
              console.log(error)
            }
          }
        }
      })
      .catch(error => {
        console.error(error);
      });
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
        console.log(error);
    }
  }  

  if (user_type !== 'Doctor') return <NonDoctorAccess/>

  return (
    <div>
      <Header dropdown={true} />
      <DoctorHeader />
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        style={{ height: "100vh" }}
        components={{
          event: CustomEvent,
        }}
      />
    </div>
  );
};
