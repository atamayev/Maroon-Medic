import { makeAutoObservable } from "mobx"

export default class DoctorListsClass {
	constructor(doctorLists: DoctorListDetails) {
		makeAutoObservable(this)
		Object.assign(this, doctorLists)
	}

	languages: LanguageItem[] = []
	servicesAndCategories: ServiceListItem[] = []
	specialties: SpecialtyItem[] = []
	preVetSchools: PreVetSchool[] = []
	preVetEducationTypes: PreVetEducationType[] = []
	majors: Major[] = []
	vetSchools: VetSchoolList[] = []
	vetEducationTypes: VetEducationType[] = []
	pets: ServicedPetItem[] = []
}
