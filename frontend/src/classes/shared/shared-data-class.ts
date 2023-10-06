import { makeAutoObservable } from "mobx"
import PersonalInfoClass from "./personal-info-class"

export default class SharedDataClass {
	constructor() {
		makeAutoObservable(this)
	}

	private _personalInfo: PersonalInfoClass | null = null
	private _headerData: string = "Profile"
	private _loginHistory: LoginHistoryItem[] | null = null

	public initializePersonalInfo(birthDateInfo: BirthDateInfo): void {
		this._personalInfo = new PersonalInfoClass(birthDateInfo)
	}

	public clearSharedData(): void {
		this.personalInfo = null
		this.headerData = "Profile"
		this.loginHistory = null
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

	get loginHistory(): LoginHistoryItem[] | null {
		return this._loginHistory
	}

	set loginHistory(value: LoginHistoryItem[] | null) {
		this._loginHistory = value
	}
}
