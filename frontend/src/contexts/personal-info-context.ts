import { makeAutoObservable } from "mobx"
import { createContext } from "react"

export class PersonalInfoContext {
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

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PersonalInfoAppContext = createContext(new PersonalInfoContext({} as BirthDateInfo))

