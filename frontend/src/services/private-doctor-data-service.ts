import { AxiosResponse } from "axios"
import http from "../http-common"

export default new class PrivateDoctorDataService {
	async addNewDoctorInfo(newDoctorObject: BirthDateInfo): Promise<AxiosResponse<EmptyResponse>>  {
		return await http.post<EmptyResponse>("private-doctor-data/new-doctor", {newDoctorObject})
	}
	async fillDashboard(): Promise<AxiosResponse<DoctorDashboardData[]>> {
		return await http.get<DoctorDashboardData[]>("/private-doctor-data/fetch-dashboard-data")
	}
	async fillPersonalData(): Promise<AxiosResponse<BirthDateInfo>> {
		return await http.get<BirthDateInfo>("/private-doctor-data/fetch-personal-data")
	}
	async savePersonalData(personalInfo: BirthDateInfo): Promise<AxiosResponse<EmptyResponse>> {
		return await http.post<EmptyResponse>("/private-doctor-data/save-personal-data", {personalInfo})
	}
	async fillAccountDetails(): Promise<AxiosResponse<DoctorAccountDetails>> {
		return await http.get<DoctorAccountDetails>("/private-doctor-data/fetch-account-details-data")
	}
	async saveDescriptionData(description: string): Promise<AxiosResponse<EmptyResponse>> {
		return await http.post<EmptyResponse>("/private-doctor-data/save-description-data", {description})
	}
	async addLanguage(languageId: number): Promise<AxiosResponse<EmptyResponse>> {
		return await http.post<EmptyResponse>(`/private-doctor-data/add-language/${languageId}`)
	}
	async deleteLanguage(languageId: number): Promise<AxiosResponse<EmptyResponse>> {
		return await http.delete<EmptyResponse>(`/private-doctor-data/delete-language/${languageId}`)
	}
	async addSpecialty(specialtyId: number): Promise<AxiosResponse<EmptyResponse>> {
		return await http.post<EmptyResponse>(`/private-doctor-data/add-specialty/${specialtyId}`)
	}
	async deleteSpecialty(specialtyId: number): Promise<AxiosResponse<EmptyResponse>> {
		return await http.delete<EmptyResponse>(`/private-doctor-data/delete-specialty/${specialtyId}`)
	}
	async addServicedPet(petId: number): Promise<AxiosResponse<EmptyResponse>> {
		return await http.post<EmptyResponse>(`/private-doctor-data/add-serviced-pet/${petId}`)
	}
	async deleteServicedPet(petId: number): Promise<AxiosResponse<EmptyResponse>> {
		return await http.delete<EmptyResponse>(`/private-doctor-data/delete-serviced-pet/${petId}`)
	}
	async savePublicAvailibility(publicAvailibility: boolean): Promise<AxiosResponse<EmptyResponse>> {
		return await http.post<EmptyResponse>("/private-doctor-data/save-public-availibility-data", {publicAvailibility})
	}
	async addPreVetEducationData(preVetEducationData: PreVetEducationData): Promise<AxiosResponse<number | EmptyResponse>> {
		return await http.post<number | EmptyResponse>("/private-doctor-data/add-pre-vet-education-data", {preVetEducationData})
	}
	async deletePreVetEducationData(preVetEducationId: number): Promise<AxiosResponse<EmptyResponse>> {
		return await http.delete<EmptyResponse>(`/private-doctor-data/delete-pre-vet-education-data/${preVetEducationId}`)
	}
	async addVetEducationData(vetEducationData: VetEducationData): Promise<AxiosResponse<number | EmptyResponse>> {
		return await http.post<number| EmptyResponse>("/private-doctor-data/add-vet-education-data", {vetEducationData})
	}
	async deleteVetEducationData(vetEducationId: number): Promise<AxiosResponse<EmptyResponse>> {
		return await http.delete<EmptyResponse>(`/private-doctor-data/delete-vet-education-data/${vetEducationId}`)
	}
	async addService(serviceObject: ServiceItemNotNullablePrice): Promise<AxiosResponse<EmptyResponse>> {
		return await http.post<EmptyResponse>("/private-doctor-data/add-service", {serviceObject})
	}
	async updateService(serviceObject: ServiceItemNotNullablePrice): Promise<AxiosResponse<EmptyResponse>> {
		return await http.patch<EmptyResponse>("/private-doctor-data/update-service", {serviceObject})
	}
	async deleteService(serviceObject: ServiceItemNotNullablePrice): Promise<AxiosResponse<EmptyResponse>> {
		return await http.delete<EmptyResponse>(`/private-doctor-data/delete-service/${serviceObject.serviceAndCategoryListId}`)
	}
	async addAddressData(addressData: BaseAddressData, timesData: DoctorAvailability[]): Promise<AxiosResponse<number | EmptyResponse>> {
		return await http.post<number | EmptyResponse>("/private-doctor-data/add-address", {addressData, timesData})
	}
	async updateAddressData(addressData: BaseAddressData, timesData: DoctorAvailability[]): Promise<AxiosResponse<EmptyResponse>> {
		return await http.patch<EmptyResponse>("/private-doctor-data/update-address", {addressData, timesData})
	}
	async deleteAddressData(addressId: number): Promise<AxiosResponse<EmptyResponse>> {
		return await http.delete<EmptyResponse>(`/private-doctor-data/delete-address/${addressId}`)
	}
}()
