import { makeAutoObservable } from "mobx"

export default class PatientDashboardDataClass {
	constructor(dashboardData: PatientDashboardData) {
		makeAutoObservable(this)
		Object.assign(this, dashboardData)
	}

	appointmentsId: number = -1
	doctorConfirmationStatus: DoctorConfirmationStatuses = "Pending"
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
	doctorFirstName: string = ""
	doctorLastName: string = ""
}
