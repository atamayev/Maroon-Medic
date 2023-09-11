import { makeAutoObservable } from "mobx"

export class PersonalInfoClass {
	constructor(info: BirthDateInfo) {
		makeAutoObservable(this)
		Object.assign(this, info)
	}

	firstName: string = ""
	lastName: string = ""
	gender: string = ""
	birthDay: number = -1
	birthMonth: string = ""
	birthYear: number = -1
}
