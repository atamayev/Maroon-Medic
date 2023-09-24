import { makeAutoObservable } from "mobx"

export default class AuthClass {
	constructor() {
		makeAutoObservable(this)
	}

	private _isAuthenticated: boolean = false
	private _userType: DoctorOrPatientOrNull = null
	private _newUser: boolean = false

	public clearAuthData(): void {
		this.isAuthenticated = false
		this.userType = null
		this.newUser = false
	}

	get isAuthenticated(): boolean {
		return this._isAuthenticated
	}

	set isAuthenticated(value: boolean) {
		this._isAuthenticated = value
	}

	get userType(): DoctorOrPatientOrNull {
		return this._userType
	}

	set userType(value: DoctorOrPatientOrNull) {
		this._userType = value
	}

	get newUser(): boolean {
		return this._newUser
	}

	set newUser(value: boolean) {
		this._newUser = value
	}
}
