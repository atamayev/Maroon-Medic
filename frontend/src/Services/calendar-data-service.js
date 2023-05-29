import http from "../http-common"

export default new class CalendarDataService {
    async makeAppointment(AppointmentObject){
        return await http.post('calendar/makeAppointment', {AppointmentObject: AppointmentObject})
    }
    async fillCalendarDetails(){
        return await http.get('calendar/getDoctorCalendarDetails');
    }
}(); 
