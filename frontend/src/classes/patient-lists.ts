import { makeAutoObservable } from "mobx"

export class PatientListsClass {
	constructor(patientLists: PatientListDetails) {
		makeAutoObservable(this)
		Object.assign(this, patientLists)
	}

	languages: LanguageItem[] = []
}
