import _ from "lodash"
import { createContext } from "react"
import { makeAutoObservable } from "mobx"
import { PersonalInfoClass } from "../classes/personal-info-class"
import { DoctorDashboardDataClass } from "../classes/doctor-dashboard-data-class"
import { PatientAccountDetailsClass } from "src/classes/patient-account-details-class"
import { DoctorAccountDetailsClass } from "src/classes/doctor-account-details-class"
import { PatientListsClass } from "src/classes/patient-lists"
import { DoctorListsClass } from "src/classes/doctor-lists"
import { PatientDashboardDataClass } from "src/classes/patient-dashboard-data-class"
import { PublicDoctorDataClass } from "src/classes/public-doctor-data-class"

export class MaroonContext {
	constructor() {
		makeAutoObservable(this)
	}

	private _isAuthenticated: boolean = false
	private _userType: DoctorOrPatientOrNull = null
	private _newUser: boolean = false
	private _personalInfo: PersonalInfoClass | null = null
	private _headerData: string = "Profile"
	private _doctorDashboardData: DoctorDashboardDataClass[] | null = null
	private _doctorCalendarDetails: DoctorCalendarEvent[] = []
	private _patientDashboardData: PatientDashboardDataClass[] | null = null
	private _loginHistory: LoginHistoryItem[] = []
	private _patientAccountDetails: PatientAccountDetailsClass | null = null
	private _doctorAccountDetails: DoctorAccountDetailsClass | null = null
	private _patientLists: PatientListsClass | null = null
	private _doctorLists: DoctorListDetails | null = null
	private _publicDoctorDataMap: Map<number, PublicDoctorDataClass> = new Map()
	private _patientPetData: SavedPetItem[] | [] = []
	private _petTypes: ServicedPetItem[] | null = null
	private _insurances: InsuranceItem[] | null = null

	public initializePersonalInfo(birthDateInfo: BirthDateInfo): void {
		if (this._isAuthenticated && !_.isNull(this._userType)) {
			this._personalInfo = new PersonalInfoClass(birthDateInfo)
		}
	}

	public initializeDoctorDashboardData(dashboardData: DoctorDashboardData[]): void {
		if (this._isAuthenticated && !_.isNull(this._userType)) {
			this._doctorDashboardData = dashboardData.map((data) => new DoctorDashboardDataClass(data))
		}
	}

	public initializePatientDashboardData(dashboardData: PatientDashboardData[]): void {
		if (this._isAuthenticated && !_.isNull(this._userType)) {
			this._patientDashboardData = dashboardData.map((data) => new PatientDashboardDataClass(data))
		}
	}

	public initializePatientAccountDetails(patientAccountDetails: PatientAccountDetails): void {
		if (this._isAuthenticated && this._userType === "Patient") {
			this._patientAccountDetails = new PatientAccountDetailsClass(patientAccountDetails)
		}
	}

	public initializeDoctorAccountDetails(doctorAccountDetails: DoctorAccountDetails): void {
		if (this._isAuthenticated && this._userType === "Doctor") {
			this._doctorAccountDetails = new DoctorAccountDetailsClass(doctorAccountDetails)
		}
	}

	public initializePatientLists(patientLists: PatientListDetails): void {
		if (this._isAuthenticated && this._userType === "Patient") {
			this._patientLists = new PatientListsClass(patientLists)
		}
	}

	public initializeDoctorLists(doctorLists: DoctorListDetails): void {
		if (this._isAuthenticated && this._userType === "Doctor") {
			this._doctorLists = new DoctorListsClass(doctorLists)
		}
	}

	public initializeSinglePublicDoctorData(doctorID: number, publicDoctorData: PublicDoctorAccountDetails): void {
		let singleDoctorData = this._publicDoctorDataMap.get(doctorID)
		if (_.isUndefined(singleDoctorData)) {
			singleDoctorData = new PublicDoctorDataClass(publicDoctorData)
			this._publicDoctorDataMap.set(doctorID, publicDoctorData)
		}
	}

	public retrieveSinglePublicDoctorData(doctorId: number | null): PublicDoctorDataClass | null {
		if (_.isNull(doctorId)) return null
		return this._publicDoctorDataMap.get(doctorId) ?? null
	}

	public doesDoctorExist(doctorId: number): boolean {
		return this._publicDoctorDataMap.has(doctorId)
	}

	public logout(): void {
		localStorage.clear()
		sessionStorage.clear()
		this._isAuthenticated = false
		this._userType = null
		this._newUser = false
		this._personalInfo = null
		this._headerData = "Profile"
		this._doctorDashboardData = null
		this._patientDashboardData = null
		this._loginHistory = []
		this._patientAccountDetails = null
		this._doctorAccountDetails = null
		this._patientLists = null
		this._doctorLists = null
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

	get doctorDashboardData(): DoctorDashboardDataClass[] | null {
		return this._doctorDashboardData
	}

	set doctorDashboardData(value: DoctorDashboardDataClass[] | null) {
		this._doctorDashboardData = value
	}

	get patientDashboardData(): PatientDashboardDataClass[] | null {
		return this._patientDashboardData
	}

	get doctorCalendarDetails(): DoctorCalendarEvent[] {
		return this._doctorCalendarDetails
	}

	set doctorCalendarDetails(value: DoctorCalendarEvent[]) {
		this._doctorCalendarDetails = value
	}

	set patientDashboardData(value: PatientDashboardDataClass[] | null) {
		this._patientDashboardData = value
	}

	get loginHistory(): LoginHistoryItem[] {
		return this._loginHistory
	}

	set loginHistory(value: LoginHistoryItem[]) {
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

	get headerData(): string {
		return this._headerData
	}

	set headerData(value: string) {
		this._headerData = value
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

	get patientPetData(): SavedPetItem[] {
		return this._patientPetData
	}

	set patientPetData(petData: SavedPetItem[]) {
		this._patientPetData = petData
	}

	get petTypes(): ServicedPetItem[] | null {
		return this._petTypes
	}

	set petTypes(value: ServicedPetItem[] | null) {
		this._petTypes = value
	}

	get insurances(): InsuranceItem[] | null {
		return this._insurances
	}

	set insurances(value: InsuranceItem[] | null) {
		this._insurances = value
	}
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AppContext = createContext(new MaroonContext())
