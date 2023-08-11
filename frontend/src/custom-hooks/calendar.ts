import { useState, useEffect } from "react"
import { FillDoctorCalendarDetails } from "./fetch-calendar-details"

export function useDoctorCalendarData(userType: DoctorOrPatientOrNull): DoctorCalendarEvent[] {
  const [events, setEvents] = useState<DoctorCalendarEvent[]>([])

  const fetchAndSetCalendarData: () => void = async () => {
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
