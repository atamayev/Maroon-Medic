import _ from "lodash"
import dayjs from "dayjs"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
dayjs.extend(isSameOrAfter)
import { observer } from "mobx-react"
import { useContext, useEffect, useState } from "react"
import UnauthorizedUser from "../../components/unauthorized-user/unauthorized-user"
import useSetDoctorDashboardData from "src/custom-hooks/private-doctor/use-set-doctor-dashboard-data"
import DoctorHeader from "./doctor-header"
import PastAppointmentsSection from "src/components/doctor-dashboard/past-appointments/past-appointments-section"
import UpcomingAppointmentsSection from "src/components/doctor-dashboard/upcoming-appointments/upcoming-appointments-section"
import AppContext from "src/contexts/maroon-context"

function DoctorDashboard() {
	const appContext = useContext(AppContext)
	const [pastAppointments, setPastAppointments] = useState<DoctorDashboardData[]>([])
	const [upcomingAppointments, setUpcomingAppointments] = useState<DoctorDashboardData[]>([])

	useEffect(() => {
		if (_.isNull(appContext.privateDoctorData)) return
		if (
			_.isNull(appContext.privateDoctorData.doctorDashboardData) ||
			_.isEmpty(appContext.privateDoctorData.doctorDashboardData) ||
			appContext.auth.userType !== "Doctor"
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
	}, [appContext.privateDoctorData?.doctorDashboardData])

	useSetDoctorDashboardData()

	if (appContext.auth.userType !== "Doctor") return <UnauthorizedUser vetOrpatient = {"vet"}/>

	function DashboardData () {
		if (_.isNull(appContext.privateDoctorData)) return null
		if (_.isEmpty(appContext.privateDoctorData.doctorDashboardData)) return <>No upcoming appointments</>
		return (
			<>
				<UpcomingAppointmentsSection
					upcomingDoctorAppointments = {upcomingAppointments}
				/>
				<PastAppointmentsSection
					pastAppointments = {pastAppointments}
				/>
			</>
		)
	}

	return (
		<>
			<DoctorHeader/>
			<DashboardData />
		</>
	)
}

export default observer(DoctorDashboard)
