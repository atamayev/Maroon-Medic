import { AxiosResponse } from "axios"
import http from "../http-common"

export default new class PrivateDoctorDataService {
	async fillDoctorLists(): Promise<AxiosResponse<DoctorListDetails>> {
		return await http.get<DoctorListDetails>("/lists/fetch-doctor-lists")
	}
	async fillPatientLists(): Promise<AxiosResponse<PatientListDetails>> {
		return await http.get<PatientListDetails>("/lists/fetch-patient-lists")
	}
	async fillPetTypes(): Promise<AxiosResponse<ServicedPetItem[]>> {
		return await http.get<ServicedPetItem[]>("/lists/fetch-pet-types")
	}
	async fillInsurances(): Promise<AxiosResponse<InsuranceItem[]>> {
		return await http.get<InsuranceItem[]>("/lists/fetch-insurances")
	}
	async fillPetMedications(): Promise<AxiosResponse<PetMedicationItem[]>> {
		return await http.get<PetMedicationItem[]>("/lists/fetch-pet-medications")
	}
	async fillPetProcedures(): Promise<AxiosResponse<PetProcedureItem[]>> {
		return await http.get<PetProcedureItem[]>("/lists/fetch-pet-procedures")
	}
}()
