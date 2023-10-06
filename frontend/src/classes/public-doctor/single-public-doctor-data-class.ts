import { makeAutoObservable } from "mobx"

export default class SinglePublicDoctorDataClass {
	constructor(info: PublicDoctorAccountDetails) {
		makeAutoObservable(this)
		Object.assign(this, info)
	}

	doctorLanguages: LanguageName[] = []
	doctorServices: ServiceItemNotNullablePrice[] = []
	doctorSpecialties: OrganizationSpecialtyName[] = []
	doctorPreVetEducation: PreVetEducationItem[] = []
	doctorVetEducation: VetEducationItem[] = []
	doctorAddressData: PublicAddressData[] = []
	description: string = ""
	servicedPets: ServicedPetData[] = []
	doctorPersonalInfo: DoctorPersonalData = {} as DoctorPersonalData
}