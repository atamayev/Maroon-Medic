import _ from "lodash"
import { makeAutoObservable } from "mobx"
import AuthClass from "../shared/auth-class"
import PatientDashboardDataClass from "./patient-dashboard-data-class"
import PatientListsClass from "./patient-lists"
import PatientAccountDetailsClass from "./patient-account-details-class"

export default class PatientDataClass {
	constructor(auth: AuthClass) {
		makeAutoObservable(this)
		this._auth = auth
	}

	private _auth: AuthClass
	private _patientDashboardData: PatientDashboardDataClass[] | null = null
	private _patientAccountDetails: PatientAccountDetailsClass | null = null
	private _patientLists: PatientListsClass | null = null
	private _patientPetData: SavedPetItem[] | [] = []
	private _petTypes: ServicedPetItem[] | null = null
	private _insurances: InsuranceItem[] | null = null

	public initializePatientDashboardData(dashboardData: PatientDashboardData[]): void {
		if (this._auth.isAuthenticated && !_.isNull(this._auth.userType)) {
			this._patientDashboardData = dashboardData.map((data) => new PatientDashboardDataClass(data))
		}
	}

	public initializePatientAccountDetails(patientAccountDetails: PatientAccountDetails): void {
		if (this._auth.isAuthenticated && this._auth.userType === "Patient") {
			this._patientAccountDetails = new PatientAccountDetailsClass(patientAccountDetails)
		}
	}

	public initializePatientLists(patientLists: PatientListDetails): void {
		if (this._auth.isAuthenticated && this._auth.userType === "Patient") {
			this._patientLists = new PatientListsClass(patientLists)
		}
	}

	public clearPatientData(): void {
		this.patientDashboardData = null
		this.patientAccountDetails = null
		this.patientLists = null
		this.patientPetData = []
		this.petTypes = null
		this.insurances = null
	}

	get patientDashboardData(): PatientDashboardDataClass[] | null {
		return this._patientDashboardData
	}

	set patientDashboardData(value: PatientDashboardDataClass[] | null) {
		this._patientDashboardData = value
	}

	get patientLists(): PatientListDetails | null {
		return this._patientLists
	}

	set patientLists(value: PatientListDetails | null) {
		this._patientLists = value
	}

	get patientAccountDetails(): PatientAccountDetailsClass | null {
		return this._patientAccountDetails
	}

	set patientAccountDetails(value: PatientAccountDetailsClass | null) {
		this._patientAccountDetails = value
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
