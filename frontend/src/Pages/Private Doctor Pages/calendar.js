import React, {useEffect, useState, useContext} from "react";
import { VerifyContext } from "../../Contexts/VerifyContext";
import { NonDoctorAccess } from "../../Components/user-type-unauth";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Header from "../header";
import DoctorHeader from "./doctor-header";
import CalendarDataService from "../../Services/calendar-data-service";

const localizer = momentLocalizer(moment);

export default function DoctorCalendar () {
    const {user_verification} = useContext(VerifyContext);
    const [user_type, setUser_type] = useState(null);
    const [events, setEvents] = useState([    {
        start: moment("2023-05-23 20:00", "YYYY-MM-DD HH:mm").toDate(),
        end: moment("2023-05-23 21:00", "YYYY-MM-DD HH:mm").toDate(),
        title: "Event Title",
    },]);

    useEffect(()=>{
        user_verification()
        .then(result => {
          if (result.verified === true) {
            setUser_type(result.user_type)
            if(result.user_type === 'Doctor'){
              try{
                const storedAccountDetails = sessionStorage.getItem("DoctorCalendarDetails")
                if(!storedAccountDetails){
                  FillDoctorCalendarDetails();
                }
              }catch(error){
                console.log(error)
              }
            }
          }
          else{
            console.log('Unverified')
          }
        })
        .catch(error => {
          console.error(error);
        });
    }, []);

    async function FillDoctorCalendarDetails(){
        try{
            const response = await CalendarDataService.fillCalendarDetails();
            if (response.status === 200){
                console.log(response)

                //setEvents(response.data)
            }
        }catch(error){
            console.log(error);
        }
    }

    if(user_type !== 'Doctor'){
        return(
          <NonDoctorAccess/>
        )
      }

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
        />
    </div>
    );
};
