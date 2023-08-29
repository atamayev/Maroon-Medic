import _ from "lodash"
import Format from "../data-formatter"
import FetchDoctorAccountDataDB from "../../db/private-doctor-data/fetch-doctor-account-data-DB"

export default new class FetchDoctorAccountData {
	async #fetchDoctorAccountData<T>(doctorId: number, retrievalFunction: (id: number) => Promise<T | T[]>): Promise<T | T[]> {
		try {
			const data = await retrievalFunction(doctorId)
			return data
		} catch (error: unknown) {
			return []
		}
	}

	async #fetchEducationData<T extends EducationItem>(
		doctorId: number,
		retrievalFunction: (id: number) => Promise<T[]>
	): Promise<T[]> {
		try {
			const educationData = await retrievalFunction(doctorId)
			const newResults = educationData.map((obj: T) => ({
				...obj,
				startDate: Format.educationDates(obj.startDate),
				endDate: Format.educationDates(obj.endDate)
			}))
			return newResults
		} catch (error: unknown) {
			return []
		}
	}

	async languages (doctorId: number): Promise<LanguageItem[]> {
		const result = await this.#fetchDoctorAccountData(doctorId, FetchDoctorAccountDataDB.languages)
		return result as LanguageItem[]
	}

	async services (doctorId: number): Promise<DetailedServiceItem[]> {
		const result = await this.#fetchDoctorAccountData(doctorId, FetchDoctorAccountDataDB.services)
		const updatedResult = Format.servicePriceToNumber(result as DetailedServiceItem[])
		return updatedResult as DetailedServiceItem[]
	}

	async specialties (doctorId: number): Promise<OrganizationSpecialty[]> {
		const result = await this.#fetchDoctorAccountData(doctorId, FetchDoctorAccountDataDB.specialties)
		return result as OrganizationSpecialty[]
	}

	async preVetEducation(doctorId: number): Promise<PreVetEducation[]> {
		const result = await this.#fetchEducationData<PreVetEducation>(doctorId, FetchDoctorAccountDataDB.preVetEducation)
		return result as PreVetEducation[]
	}

	async vetEducation(doctorId: number): Promise<VetEducation[]> {
		const result = await this.#fetchEducationData<VetEducation>(doctorId, FetchDoctorAccountDataDB.vetEducation)
		return result as VetEducation[]
	}

	async addresses (doctorId: number): Promise<PrivateDoctorAddressData[]> {
		try {
			const addressData = await FetchDoctorAccountDataDB.addressData(doctorId)

			if (!_.isEmpty(addressData)) {
				for (const address of addressData) {
					const times = await FetchDoctorAccountDataDB.availabilityData(address.addressesId)
					address.times = times

					const phoneData = await FetchDoctorAccountDataDB.phoneData(address.addressesId)
					address.phone = phoneData
				}
			}
			return addressData
		} catch (error: unknown) {
			return []
		}
	}

	async description (doctorId: number): Promise<string> {
		try {
			const description = await FetchDoctorAccountDataDB.descriptionData(doctorId)
			return description || ""
		} catch (error: unknown) {
			return ""
		}
	}

	async servicedPets (doctorId: number): Promise<ServicedPetItem[]> {
		const result = await this.#fetchDoctorAccountData(doctorId, FetchDoctorAccountDataDB.servicedPets)
		return result as ServicedPetItem[]
	}

	async verifiedAndPubliclyAvailable (doctorId: number): Promise<DoctorStatus> {
		try {
			const status = await FetchDoctorAccountDataDB.verifiedAndPubliclyAvailableStatus(doctorId)
			return status
		} catch (error: unknown) {
			return {publiclyAvailable: false, verified: false}
		}
	}

	async pictures (doctorId: number): Promise<PicturesItem[]> {
		const result = await this.#fetchDoctorAccountData(doctorId, FetchDoctorAccountDataDB.pictures)
		return result as PicturesItem[]
	}
}()
