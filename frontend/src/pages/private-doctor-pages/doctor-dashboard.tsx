import _ from "lodash"
import dayjs from "dayjs"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
dayjs.extend(isSameOrAfter)
import { observer } from "mobx-react"
import { useContext, useEffect, useState } from "react"
import UnauthorizedUser from "../../components/unauthorized-user/unauthorized-user"
import useSetDoctorDashboardData from "src/custom-hooks/use-set-doctor-dashboard-data"
import DoctorHeader from "./doctor-header"
import PersonalInfo from "src/components/doctor-dashboard/personal-info"
import PastAppointmentsSection from "src/components/doctor-dashboard/past-appointments/past-appointments-section"
import UpcomingAppointmentsSection from "src/components/doctor-dashboard/upcoming-appointments/upcoming-appointments-section"
import { AppContext } from "src/contexts/maroon-context"

function DoctorDashboard() {
	const appContext = useContext(AppContext)
	const [pastAppointments, setPastAppointments] = useState<DoctorDashboardData[]>([])
	const [upcomingAppointments, setUpcomingAppointments] = useState<DoctorDashboardData[]>([])

	useEffect(() => {
		if (
			_.isNull(appContext.doctorDashboardData) ||
			_.isEmpty(appContext.doctorDashboardData) ||
			appContext.userType !== "Doctor"
		) return

		const now = dayjs()
		const pastDoctorAppointments = appContext.doctorDashboardData.filter(appointment =>
			dayjs(appointment.appointmentDate, "MMMM D, YYYY, h:mm A").isBefore(now)
		)
		const upcomingDoctorAppointments = appContext.doctorDashboardData.filter(appointment =>
			dayjs(appointment.appointmentDate, "MMMM D, YYYY, h:mm A").isSameOrAfter(now)
		)

		setPastAppointments(pastDoctorAppointments)
		setUpcomingAppointments(upcomingDoctorAppointments)
	}, [appContext.doctorDashboardData])

	useSetDoctorDashboardData()

	if (appContext.userType !== "Doctor") return <UnauthorizedUser vetOrpatient = {"vet"}/>

	function DashboardData () {
		if (_.isEmpty(appContext.doctorDashboardData)) return <>No upcoming appointments</>
		return (
			<>
				<UpcomingAppointmentsSection
					upcomingDoctorAppointments = {upcomingAppointments}
				/>
				<PastAppointmentsSection pastAppointments = {pastAppointments}/>
			</>
		)
	}

	return (
		<>
			<DoctorHeader/>
			<PersonalInfo />
			<DashboardData />
		</>
	)
}

export default observer(DoctorDashboard)
