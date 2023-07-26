import http from "../http-common"

interface AppointmentObject {
  Service_and_category_list_ID: number
  appointmentDate: string
  appointmentTime: string
  appointmentTimespan: string
  appointmentPrice: number
  NVI: number
  AddressesID: number
  InstantBook: boolean
  message: string
  selectedPetID: number
}

export default new class CalendarDataService {
  async makeAppointment(AppointmentObject: AppointmentObject) {
    return await http.post("/calendar/makeAppointment", {AppointmentObject})
  }
  async fillCalendarDetails() {
    return await http.get("/calendar/getDoctorCalendarDetails")
  }
  async confirmAppointment(AppointmentID: number) {
    return await http.patch("/calendar/confirm-appointment", {AppointmentID})
  }
}()
