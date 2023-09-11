import { makeAutoObservable } from "mobx"
import { createContext } from "react"
import { PersonalInfoClass } from "../classes/personal-info-class"
import { DashboardDataClass } from "../classes/dashboard-data-class"
import { PatientAccountDetailsClass } from "src/classes/patient-account-details-class"
import { DoctorAccountDetailsClass } from "src/classes/doctor-account-details-class"
import { PatientListsClass } from "src/classes/patient-lists"

export class MaroonContext {
	constructor() {
		makeAutoObservable(this)
	}

	private _isAuthenticated: boolean = false
	private _userType: DoctorOrPatientOrNull = null
	private _newUser: boolean = false
	private _personalInfo: PersonalInfoClass | null = null
	private _dashboardData: DashboardDataClass[] | null = null
	private _loginHistory: LoginHistoryItem[] | null = null
	private _patientAccountDetails: PatientAccountDetailsClass | null = null
	private _doctorAccountDetails: DoctorAccountDetailsClass | null = null
	private _patientLists: PatientListsClass | null = null
	private _doctorLists: DoctorListDetails | null = null

	initializePersonalInfo(birthDateInfo: BirthDateInfo): void {
		if (this.isAuthenticated && this._userType) {
			this._personalInfo = new PersonalInfoClass(birthDateInfo)
		}
	}

	initializeDashboardData(dashboardData: DoctorDashboardData[] | PatientDashboardData[]): void {
		if (this.isAuthenticated && this._userType) {
			this._dashboardData = dashboardData.map((data) => new DashboardDataClass(data))
		}
	}

	initializePatientAccountDetails(patientAccountDetails: PatientAccountDetails): void {
		if (this.isAuthenticated && this._userType === "Patient") {
			this._patientAccountDetails = new PatientAccountDetailsClass(patientAccountDetails)
		}
	}

	initializeDoctorAccountDetails(doctorAccountDetails: DoctorAccountDetails): void {
		if (this.isAuthenticated && this._userType === "Doctor") {
			this._doctorAccountDetails = new DoctorAccountDetailsClass(doctorAccountDetails)
		}
	}

	initializePatientLists(patientLists: PatientListDetails): void {
		if (this.isAuthenticated && this._userType === "Doctor") {
			this._patientLists = new PatientListsClass(patientLists)
		}
	}

	initializeDoctorLists(doctorLists: DoctorListDetails): void {
		if (this.isAuthenticated && this._userType === "Patient") {
			this._doctorLists = doctorLists
		}
	}

	get doctorLists(): DoctorListDetails | null {
		return this._doctorLists
	}

	get patientLists(): PatientListsClass | null {
		return this._patientLists
	}

	get doctorAccountDetails(): DoctorAccountDetailsClass | null {
		return this._doctorAccountDetails
	}

	set doctorAccountDetails(value: DoctorAccountDetailsClass | null) {
		this._doctorAccountDetails = value
	}

	get patientAccountDetails(): PatientAccountDetailsClass | null {
		return this._patientAccountDetails
	}

	get dashboardData(): DashboardDataClass[] | null {
		return this._dashboardData
	}

	set dashboardData(value: DashboardDataClass[] | null) {
		this._dashboardData = value
	}

	get loginHistory(): LoginHistoryItem[] | null {
		return this._loginHistory
	}

	set loginHistory(value: LoginHistoryItem[] | null) {
		this._loginHistory = value
	}

	get isAuthenticated(): boolean {
		return this._isAuthenticated
	}

	set isAuthenticated(value: boolean) {
		this._isAuthenticated = value
	}

	get personalInfo(): PersonalInfoClass | null {
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
