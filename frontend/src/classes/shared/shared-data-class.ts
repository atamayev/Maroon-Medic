import _ from "lodash"
import { makeAutoObservable } from "mobx"
import PersonalInfoClass from "./personal-info-class"
import AuthClass from "./auth-class"

export default class SharedDataClass {
	constructor(auth: AuthClass) {
		makeAutoObservable(this)
		this._auth = auth
	}

	private _auth: AuthClass
	private _personalInfo: PersonalInfoClass | null = null
	private _headerData: string = "Profile"
	private _loginHistory: LoginHistoryItem[] = []

	public initializePersonalInfo(birthDateInfo: BirthDateInfo): void {
		if (this._auth.isAuthenticated && !_.isNull(this._auth.userType)) {
			this._personalInfo = new PersonalInfoClass(birthDateInfo)
		}
	}

	public clearSharedData(): void {
		this.personalInfo = null
		this.headerData = "Profile"
		this.loginHistory = []
	}

	get personalInfo(): PersonalInfoClass | null {
		return this._personalInfo
	}

	set personalInfo(value: PersonalInfoClass | null) {
		this._personalInfo = value
	}

	get headerData(): string {
		return this._headerData
	}

	set headerData(value: string) {
		this._headerData = value
	}

	get loginHistory(): LoginHistoryItem[] {
		return this._loginHistory
	}

	set loginHistory(value: LoginHistoryItem[]) {
		this._loginHistory = value
	}
}
