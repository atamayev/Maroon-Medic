import { AxiosResponse } from "axios"
import http from "../http-common"

export default new class PrivatePatientDataService {
	async addingPatientInfo(newPatientObject: BirthDateInfo): Promise<AxiosResponse<EmptyResponse>> {
		return await http.post<EmptyResponse>("private-patient-data/new-patient", {newPatientObject})
	}
	async fillDashboard(): Promise<AxiosResponse<PatientDashboardData[]>> {
		return await http.get<PatientDashboardData[]>("/private-patient-data/fetch-dashboard-data")
	}
	async fillPersonalData(): Promise<AxiosResponse<BirthDateInfo>> {
		return await http.get<BirthDateInfo>("/private-patient-data/fetch-personal-data")
	}
	async savePersonalData(personalInfo: BirthDateInfo): Promise<AxiosResponse<EmptyResponse>> {
		return await http.post<EmptyResponse>("/private-patient-data/save-personal-data", {personalInfo})
	}
	async fillAccountDetails(): Promise<AxiosResponse<PatientAccountDetails>> {
		return await http.get<PatientAccountDetails>("/private-patient-data/fetch-account-details-data")
	}
	async addLanguage(languageId: number): Promise<AxiosResponse<EmptyResponse>> {
		return await http.post<EmptyResponse>("/private-patient-data/add-language", {languageId})
	}
	async deleteLanguage(languageId: number): Promise<AxiosResponse<EmptyResponse>> {
		return await http.delete<EmptyResponse>(`/private-patient-data/delete-language/${languageId}`)
	}
	async fetchPetData(): Promise<AxiosResponse<SavedPetItem[]>> {
		return await http.get<SavedPetItem[]>("/private-patient-data/fetch-pet-data")
	}
	async addPetData(petData: PetItemForCreation): Promise<AxiosResponse<number | EmptyResponse>> {
		return await http.post<number | EmptyResponse>("/private-patient-data/add-pet-data", {petData})
	}
	async deletePetData(petId: number): Promise<AxiosResponse<EmptyResponse>> {
		return await http.delete<EmptyResponse>(`/private-patient-data/delete-pet-data/${petId}`)
	}
}()
