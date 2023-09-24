import { makeAutoObservable } from "mobx"

export default class DoctorDashboardDataClass {
	constructor(dashboardData: DoctorDashboardData) {
		makeAutoObservable(this)
		Object.assign(this, dashboardData)
	}

	appointmentsId: number = -1
	doctorConfirmationStatus: boolean = false
	categoryName: string = ""
	createdAt: MysqlTimestamp = ""
	serviceName: string = ""
	addressLine1: string = ""
	addressLine2: string = ""
	addressTitle: string = ""
	appointmentDate: MysqlTimestamp = ""
	appointmentPrice: number = -1
	appointmentTimespan: number = -1
	city: string = ""
	patientMessage: string = ""
	state: string = ""
	country: string = ""
	zip: string = ""
	petName: string = ""
	patientFirstName: string = ""
	patientLastName: string = ""
}
