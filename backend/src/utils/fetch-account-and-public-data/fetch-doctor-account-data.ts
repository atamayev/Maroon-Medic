import _ from "lodash"
import Format from "../data-formatter"
import FetchDoctorAccountDataDB from "../../db/private-doctor-data/fetch-doctor-account-data-DB"

export default new class FetchDoctorAccountData {
	async #fetchDoctorAccountData<T>(DoctorID: number, retrievalFunction: (id: number) => Promise<T | T[]>): Promise<T | T[]> {
		try {
			const data = await retrievalFunction(DoctorID)
			return data
		} catch (error: unknown) {
			return []
		}
	}

	async #fetchEducationData<T extends EducationItem>(
		DoctorID: number,
		retrievalFunction: (id: number) => Promise<T[]>
	): Promise<T[]> {
		try {
			const educationData = await retrievalFunction(DoctorID)
			const newResults = educationData.map((obj: T) => ({
				...obj,
				Start_Date: Format.educationDates(obj.Start_Date),
				End_Date: Format.educationDates(obj.End_Date)
			}))
			return newResults
		} catch (error: unknown) {
			return []
		}
	}

	async languages (DoctorID: number): Promise<LanguageItem[]> {
		const result = await this.#fetchDoctorAccountData(DoctorID, FetchDoctorAccountDataDB.languages)
		return result as LanguageItem[]
	}

	async services (DoctorID: number): Promise<DetailedServiceItem[]> {
		const result = await this.#fetchDoctorAccountData(DoctorID, FetchDoctorAccountDataDB.services)
		return result as DetailedServiceItem[]
	}

	async specialties (DoctorID: number): Promise<OrganizationSpecialty[]> {
		const result = await this.#fetchDoctorAccountData(DoctorID, FetchDoctorAccountDataDB.specialties)
		return result as OrganizationSpecialty[]
	}

	async preVetEducation(DoctorID: number): Promise<PreVetEducation[]> {
		const result = await this.#fetchEducationData<PreVetEducation>(DoctorID, FetchDoctorAccountDataDB.preVetEducation)
		return result as PreVetEducation[]
	}

	async vetEducation(DoctorID: number): Promise<VetEducation[]> {
		const result = await this.#fetchEducationData<VetEducation>(DoctorID, FetchDoctorAccountDataDB.vetEducation)
		return result as VetEducation[]
	}

	async addresses (DoctorID: number): Promise<PrivateDoctorAddressData[]> {
		try {
			const addressData = await FetchDoctorAccountDataDB.addressData(DoctorID)

			if (!_.isEmpty(addressData)) {
				for (const address of addressData) {
					const times = await FetchDoctorAccountDataDB.availabilityData(address.addressesID)
					address.times = times

					const phoneData = await FetchDoctorAccountDataDB.phoneData(address.addressesID)
					address.phone = phoneData
				}
			}
			return addressData
		} catch (error: unknown) {
			return []
		}
	}

	async description (DoctorID: number): Promise<string> {
		try {
			const description = await FetchDoctorAccountDataDB.descriptionData(DoctorID)
			return description || ""
		} catch (error: unknown) {
			return ""
		}
	}

	async servicedPets (DoctorID: number): Promise<ServicedPetItem[]> {
		const result = await this.#fetchDoctorAccountData(DoctorID, FetchDoctorAccountDataDB.servicedPets)
		return result as ServicedPetItem[]
	}

	async verifiedAndPubliclyAvailable (DoctorID: number): Promise<DoctorStatus> {
		try {
			const status = await FetchDoctorAccountDataDB.verifiedAndPubliclyAvailableStatus(DoctorID)
			return status
		} catch (error: unknown) {
			return {PubliclyAvailable: false, Verified: false}
		}
	}

	async pictures (DoctorID: number): Promise<PicturesItem[]> {
		const result = await this.#fetchDoctorAccountData(DoctorID, FetchDoctorAccountDataDB.pictures)
		return result as PicturesItem[]
	}
}()
