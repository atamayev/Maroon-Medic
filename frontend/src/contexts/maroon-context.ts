import { makeAutoObservable } from "mobx"
import { createContext } from "react"
import { PersonalInfoContext } from "./personal-info-context"

export class MaroonContext {
	constructor() {
		makeAutoObservable(this)
	}

	private _isAuthenticated: boolean = false
	private _userType: DoctorOrPatientOrNull = null
	private _newUser: boolean = false
	private _personalInfo: PersonalInfoContext | null = null

	initializePersonalInfo(birthDateInfo: BirthDateInfo): void {
		if (this.isAuthenticated && this._userType) {
			this._personalInfo = new PersonalInfoContext(birthDateInfo)
		}
	}

	get isAuthenticated(): boolean {
		return this._isAuthenticated
	}

	set isAuthenticated(value: boolean) {
		this._isAuthenticated = value
	}

	get personalInfo(): PersonalInfoContext | null {
		return this._personalInfo
	}

	get userType(): "Doctor" | "Patient" | null {
		return this._userType
	}

	set userType(value: "Doctor" | "Patient" | null) {
		this._userType = value
	}

	get newUser(): boolean {
		return this._newUser
	}

	set newUser(value: boolean) {
		this._newUser = value
	}
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AppContext = createContext(new MaroonContext())
