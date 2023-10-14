import { makeAutoObservable } from "mobx"

export default class PersonalInfoClass {
	constructor(info: BirthDateInfo) {
		makeAutoObservable(this)
		Object.assign(this, info)
	}

	firstName: string = ""
	lastName: string = ""
	gender: string = ""
	dateOfBirth: string = ""
}
