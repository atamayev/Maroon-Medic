import http from "../http-common"
// this is where all the api calls are coming from
export default new class PrivatePatientDataService {
    async addingPatientInfo(new_patient_object){
        return await http.post(`private-patient-data/new-patient`, {new_patient_object})
    }
    async fillDashboard(){
        return await http.get('/private-patient-data/fetch-dashboard-data')
    }
    async newPatientConfirmation(){
        return await http.get(`private-patient-data/new-patient-confirmation`)
    }
    async fillPersonalData(){
        return await http.get('/private-patient-data/fetch-personal-data')
    }
    async savePersonalData(personalInfo){
        return await http.post('/private-patient-data/save-personal-data', {personalInfo})
    }
    async fillLists(){
        return await http.get('/private-patient-data/fetch-patient-lists')
    }
}();
