import _ from "lodash"
import Format from "../data-formatter"
import FetchPublicDoctorDataDB from "../../db/fetch-public-doctor-data-db"

export default new class FetchPublicDoctorData {
	async #fetchDoctorData<T>(doctorId: number, retrievalFunction: (id: number) => Promise<T | T[]>): Promise<T | T[]> {
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
			const newResults = educationData.map((object: T) => ({
				...object,
				startDate: Format.educationDates(object.startDate),
				endDate: Format.educationDates(object.endDate)
			}))
			return newResults
		} catch (error: unknown) {
			return []
		}
	}

	async languages (doctorId: number): Promise<LanguageName[]> {
		const result = await this.#fetchDoctorData(doctorId, FetchPublicDoctorDataDB.languages)
		return result as LanguageName[]
	}

	async specialties (doctorId: number): Promise<OrganizationSpecialtyName[]> {
		const result = await this.#fetchDoctorData(doctorId, FetchPublicDoctorDataDB.specialties)
		return result as OrganizationSpecialtyName[]
	}

	async preVetEducation(doctorId: number): Promise<PublicPreVetEducation[]> {
		return await this.#fetchEducationData<PublicPreVetEducation>(doctorId, FetchPublicDoctorDataDB.preVetEducation)
	}

	async vetEducation(doctorId: number): Promise<EducationItem[]> {
		return await this.#fetchEducationData<EducationItem>(doctorId, FetchPublicDoctorDataDB.vetEducation)
	}

	async servicedPets (doctorId: number): Promise<ServicedPetData[]> {
		const result = await this.#fetchDoctorData(doctorId, FetchPublicDoctorDataDB.servicedPets)
		return result as ServicedPetData[]
	}

	async addresses (doctorId: number): Promise<PublicAddressData[]> {
		let addressData

		try {
			addressData = await FetchPublicDoctorDataDB.addressData(doctorId)
		} catch (error: unknown) {
			return []
		}

		if (!_.isEmpty(addressData)) {
			// Create a new array of modified addressData objects
			addressData = await Promise.all(addressData.map(async address => {
				try {
					const availabilityData = await FetchPublicDoctorDataDB.availabilityData(address.addressesId)
					return { ...address, times: availabilityData }
				} catch (error: unknown) {
					console.error(error)
					return { ...address, times: [] }
				}
			}))
		}
		return addressData as PublicAddressData[]
	}

	async personalInfo (doctorId: number): Promise<DoctorPersonalInfo> {
		const result = await this.#fetchDoctorData<DoctorPersonalInfo>(doctorId, FetchPublicDoctorDataDB.personalData)
		return result as DoctorPersonalInfo
	}
}()
