import _ from "lodash"
import dayjs from "dayjs"
import { useEffect, useContext } from "react"
import AppContext from "src/contexts/maroon-context"

export default function useSetPatientAppointmentsdData(
	setPastAppointments: React.Dispatch<React.SetStateAction<PatientDashboardData[]>>,
	setUpcomingAppointments: React.Dispatch<React.SetStateAction<PatientDashboardData[]>>
): void {
	const appContext = useContext(AppContext)

	const assignAppointments = (): void => {
		if (
			_.isNull(appContext.patientData) ||
			_.isNil(appContext.patientData.patientDashboardData)
		) return

		const now = dayjs()
		const pastPatientAppointments = appContext.patientData.patientDashboardData.filter(appointment =>
			dayjs(appointment.appointmentDate, "MMMM D, YYYY, h:mm A").isBefore(now)
		)
		const upcomingPatientAppointments = appContext.patientData.patientDashboardData.filter(appointment =>
			dayjs(appointment.appointmentDate, "MMMM D, YYYY, h:mm A").isSameOrAfter(now)
		)

		if (!_.isNil(pastPatientAppointments)) setPastAppointments(pastPatientAppointments)
		if (!_.isNil(upcomingPatientAppointments)) setUpcomingAppointments(upcomingPatientAppointments)
	}

	useEffect(() => {
		if (
			_.isNull(appContext.patientData) ||
			_.isNil(appContext.patientData.patientDashboardData) ||
			_.isEmpty(appContext.patientData.patientDashboardData) ||
			appContext.auth.userType !== "Patient"
		) return

		assignAppointments()

	}, [appContext.patientData?.patientDashboardData])
}
