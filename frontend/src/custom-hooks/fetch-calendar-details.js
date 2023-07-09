import CalendarDataService from "../services/calendar-data-service"
import { invalidUserAction } from "./user-verification-snippets"

export async function FillDoctorCalendarDetails(setEvents) {
  try {
    const response = await CalendarDataService.fillCalendarDetails()
    if (response.status === 200) {
      const events = response.data.map(appointment => {
        const startTime = new Date(appointment.appointment_date)
        const endTime = new Date(startTime)
        endTime.setMinutes(startTime.getMinutes() + parseInt(appointment.Service_time))
        return {
          title: appointment.Service_name,
          start: startTime,
          end: endTime,
          Doctor_confirmation_status: appointment.Doctor_confirmation_status
        }
      })
      setEvents(events)
    }
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
  }
}
