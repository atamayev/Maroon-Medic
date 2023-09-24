import { makeAutoObservable } from "mobx"

export default class DoctorAccountDetailsClass {
	constructor(doctorAccountDetails: DoctorAccountDetails) {
		makeAutoObservable(this)
		Object.assign(this, doctorAccountDetails)
	}

	languages: LanguageItem[] = []
	services: ServiceItemNotNullablePrice[] = []
	specialties: SpecialtyItem[] = []
	preVetEducation: PreVetEducationItem[] = []
	vetEducation: VetEducationItem[] = []
	addressData: DoctorAddressData[] = []
	description: string = ""
	servicedPets: ServicedPetItem[] = []
	verified: boolean = false
	publiclyAvailable: boolean = false
}
