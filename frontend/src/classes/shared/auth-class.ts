import _ from "lodash"
import { makeAutoObservable } from "mobx"

export default class AuthClass {
	constructor(
		private readonly accessToken: string | null,
		userType: DoctorOrPatientOrNull
	) {
		makeAutoObservable(this)
		this.assignAuthData(userType)
	}

	private assignAuthData(userType: DoctorOrPatientOrNull): void {
		if (!_.isNull(this.accessToken) && !_.isNull(userType)) {
			this._isAuthenticated = true
			this._userType = userType
			localStorage.setItem("UserType", userType as DoctorOrPatient)
		}
	}

	private _isAuthenticated: boolean = false
	private _userType: DoctorOrPatientOrNull = null
	private _newUser: boolean = false

	public clearAuthData(): void {
		this.isAuthenticated = false
		this._userType = null
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
		localStorage.setItem("UserType", value as DoctorOrPatient)
	}

	get newUser(): boolean {
		return this._newUser
	}

	set newUser(value: boolean) {
		this._newUser = value
	}
}
