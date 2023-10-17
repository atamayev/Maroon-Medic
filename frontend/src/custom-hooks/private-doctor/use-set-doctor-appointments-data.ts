import _ from "lodash"
import dayjs from "dayjs"
import { useEffect, useContext } from "react"
import AppContext from "src/contexts/maroon-context"

export default function useSetDoctorAppointmentsdData(
	setPastAppointments: React.Dispatch<React.SetStateAction<DoctorDashboardData[]>>,
	setUpcomingAppointments: React.Dispatch<React.SetStateAction<DoctorDashboardData[]>>
): void {
	const appContext = useContext(AppContext)

	const assignAppointments = (): void => {
		if (
			_.isNull(appContext.privateDoctorData) ||
			_.isNil(appContext.privateDoctorData.doctorDashboardData)
		) return

		const now = dayjs()
		const pastDoctorAppointments = appContext.privateDoctorData.doctorDashboardData.filter(appointment =>
			dayjs(appointment.appointmentDate, "MMMM D, YYYY, h:mm A").isBefore(now)
		)
		const upcomingDoctorAppointments = appContext.privateDoctorData.doctorDashboardData.filter(appointment =>
			dayjs(appointment.appointmentDate, "MMMM D, YYYY, h:mm A").isSameOrAfter(now)
		)

		setPastAppointments(pastDoctorAppointments)
		setUpcomingAppointments(upcomingDoctorAppointments)
	}

	useEffect(() => {
		if (
			_.isNull(appContext.privateDoctorData) ||
			_.isNull(appContext.privateDoctorData.doctorDashboardData) ||
			_.isEmpty(appContext.privateDoctorData.doctorDashboardData) ||
			appContext.auth.userType !== "Doctor"
		) return

		assignAppointments()

	}, [appContext.privateDoctorData?.doctorDashboardData])
}
