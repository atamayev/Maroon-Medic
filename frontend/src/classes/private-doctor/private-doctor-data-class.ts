import { makeAutoObservable } from "mobx"
import DoctorDashboardDataClass from "./doctor-dashboard-data-class"
import DoctorAccountDetailsClass from "./doctor-account-details-class"
import DoctorListsClass from "./doctor-lists"

export default class PrivateDoctorDataClass {
	constructor() {
		makeAutoObservable(this)
	}

	private _doctorDashboardData: DoctorDashboardDataClass[] | null = null
	private _doctorCalendarDetails: DoctorCalendarEvent[] = []
	private _doctorAccountDetails: DoctorAccountDetailsClass | null = null
	private _doctorLists: DoctorListsClass | null = null

	public initializeDoctorDashboardData(dashboardData: DoctorDashboardData[]): void {
		this._doctorDashboardData = dashboardData.map((data) => new DoctorDashboardDataClass(data))
	}

	public initializeDoctorAccountDetails(doctorAccountDetails: DoctorAccountDetails): void {
		this._doctorAccountDetails = new DoctorAccountDetailsClass(doctorAccountDetails)
		this._doctorAccountDetails.temporaryAddressData = this._doctorAccountDetails.addressData
	}

	public initializeDoctorLists(doctorLists: DoctorListDetails): void {
		this._doctorLists = new DoctorListsClass(doctorLists)
	}

	public clearDoctorData(): void {
		this.doctorDashboardData = null
		this.doctorCalendarDetails = []
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

	get doctorAccountDetails(): DoctorAccountDetailsClass | null {
		return this._doctorAccountDetails
	}

	set doctorAccountDetails(value: DoctorAccountDetailsClass | null) {
		this._doctorAccountDetails = value
	}

	get doctorLists(): DoctorListDetails | null {
		return this._doctorLists
	}

	set doctorLists(value: DoctorListDetails | null) {
		this._doctorLists = value
	}
}
