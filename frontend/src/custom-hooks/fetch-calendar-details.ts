import CalendarDataService from "../services/calendar-data-service"
import { handle401AxiosError } from "src/utils/handle-errors"

interface CalendarData {
  appointmentsID: number
  appointment_date: MysqlTimestamp
  appointment_price: number
  appointment_timespan: number
  patient_message: string
  Doctor_confirmation_status: boolean
  Created_at: MysqlTimestamp
  Category_name: string
  Service_name: string
  address_title: string
  address_line_1: string
  address_line_2: string
  city: string
  state: string
  zip: string
  country: string
  Patient_FirstName: string
  Patient_LastName: string
}

export async function FillDoctorCalendarDetails(
  setEvents: React.Dispatch<React.SetStateAction<DoctorCalendarEvent[]>>
): Promise<void> {
  try {
    const response = await CalendarDataService.fillCalendarDetails()
    if (response.status === 200) {
      const events: DoctorCalendarEvent[] = response.data.map((appointment: CalendarData) => {
        const startTime = new Date(appointment.appointment_date)
        const endTime = new Date(startTime)
        endTime.setMinutes(startTime.getMinutes() + appointment.appointment_timespan)
        return {
          title: appointment.Service_name,
          start: startTime,
          end: endTime,
          Doctor_confirmation_status: appointment.Doctor_confirmation_status
        }
      })
      setEvents(events)
    }
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}
