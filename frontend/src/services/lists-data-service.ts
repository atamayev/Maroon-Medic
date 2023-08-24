import http from "../http-common"

export default new class PrivateDoctorDataService {
	async fillDoctorLists() {
		return await http.get("/lists/fetch-doctor-lists")
	}
	async fillPatientLists() {
		return await http.get("/lists/fetch-patient-lists")
	}
	async fillPetTypes() {
		return await http.get("/lists/fetch-pet-types")
	}
	async fillInsurances() {
		return await http.get("/lists/fetch-insurances")
	}
}()
