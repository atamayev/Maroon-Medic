import { makeAutoObservable } from "mobx"

export class DashboardDataClass {
	constructor(dashboardData: DoctorDashboardData | PatientDashboardData) {
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

	//For if the user is a doctor
	patientFirstName?: string = ""
	patientLastName?: string = ""

	//For if the user is a patient
	doctorFirstName?: string = ""
	doctorLastName?: string = ""
}
