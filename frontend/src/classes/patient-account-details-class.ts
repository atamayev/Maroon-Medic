import { makeAutoObservable } from "mobx"

export class PatientAccountDetailsClass {
	constructor(patientAccountDetails: PatientAccountDetails) {
		makeAutoObservable(this)
		Object.assign(this, patientAccountDetails)
	}

	languages: LanguageItem[] = []
}
