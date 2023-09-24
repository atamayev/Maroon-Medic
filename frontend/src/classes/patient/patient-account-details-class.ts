import { makeAutoObservable } from "mobx"

export default class PatientAccountDetailsClass {
	constructor(patientAccountDetails: PatientAccountDetails) {
		makeAutoObservable(this)
		Object.assign(this, patientAccountDetails)
	}

	languages: LanguageItem[] = []
}
