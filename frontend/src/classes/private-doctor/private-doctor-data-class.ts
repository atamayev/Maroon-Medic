import _ from "lodash"
import { makeAutoObservable } from "mobx"
import AuthClass from "../shared/auth-class"
import DoctorDashboardDataClass from "./doctor-dashboard-data-class"
import DoctorAccountDetailsClass from "./doctor-account-details-class"
import DoctorListsClass from "./doctor-lists"

export default class PrivateDoctorDataClass {
	constructor(auth: AuthClass) {
		makeAutoObservable(this)
		this._auth = auth
	}

	private _auth: AuthClass
	private _doctorDashboardData: DoctorDashboardDataClass[] | null = null
	private _doctorCalendarDetails: DoctorCalendarEvent[] = []
	private _doctorAccountDetails: DoctorAccountDetailsClass | null = null
	private _doctorLists: DoctorListsClass | null = null

	public initializeDoctorDashboardData(dashboardData: DoctorDashboardData[]): void {
		if (this._auth.isAuthenticated && !_.isNull(this._auth.userType)) {
			this._doctorDashboardData = dashboardData.map((data) => new DoctorDashboardDataClass(data))
		}
	}

	public initializeDoctorAccountDetails(doctorAccountDetails: DoctorAccountDetails): void {
		if (this._auth.isAuthenticated && this._auth.userType === "Doctor") {
			this._doctorAccountDetails = new DoctorAccountDetailsClass(doctorAccountDetails)
		}
	}

	public initializeDoctorLists(doctorLists: DoctorListDetails): void {
		if (this._auth.isAuthenticated && this._auth.userType === "Doctor") {
			this._doctorLists = new DoctorListsClass(doctorLists)
		}
	}

	public clearDoctorData(): void {
		this.doctorDashboardData = null
		this.doctorAccountDetails = null
		this.doctorLists = null
	}

	get doctorDashboardData(): DoctorDashboardDataClass[] | null {
		return this._doctorDashboardData
	}

	set doctorDashboardData(value: DoctorDashboardDataClass[] | null) {
		this._doctorDashboardData = value
	}

	get doctorCalendarDetails(): DoctorCalendarEvent[] {
		return this._doctorCalendarDetails
	}

	set doctorCalendarDetails(value: DoctorCalendarEvent[]) {
		this._doctorCalendarDetails = value
	}

	get doctorLists(): DoctorListDetails | null {
		return this._doctorLists
	}

	set doctorLists(value: DoctorListDetails | null) {
		this._doctorLists = value
	}

	get doctorAccountDetails(): DoctorAccountDetailsClass | null {
		return this._doctorAccountDetails
	}

	set doctorAccountDetails(value: DoctorAccountDetailsClass | null) {
		this._doctorAccountDetails = value
	}
}
