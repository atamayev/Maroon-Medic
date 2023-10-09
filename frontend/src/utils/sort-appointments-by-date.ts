import dayjs from "dayjs"

export const sortDoctorAppointmentsByDate = (doctorDashboardData: DoctorDashboardData[]): DoctorDashboardData[] => {
	const sortedAppointments = doctorDashboardData.sort((a, b) => {
		const dateA = dayjs(a.appointmentDate)
		const dateB = dayjs(b.appointmentDate)
		if (dateA.isBefore(dateB)) return -1
		else if (dateA.isAfter(dateB))	return 1
		else return 0
	})
	return sortedAppointments
}

export const sortPatientAppointmentsByDate = (patientDashboardData: PatientDashboardData[]): PatientDashboardData[] => {
	const sortedAppointments = patientDashboardData.sort((a, b) => {
		const dateA = dayjs(a.appointmentDate)
		const dateB = dayjs(b.appointmentDate)
		if (dateA.isBefore(dateB)) return -1
		else if (dateA.isAfter(dateB))	return 1
		else return 0
	})
	return sortedAppointments
}

