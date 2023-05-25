import http from "../http-common"

export default new class CalendarDataService {
    async fillCalendarDetails(){
        return await http.get('calendar/getDoctorCalendarDetails');
    }
}(); 
