import _ from "lodash"
import dayjs from "dayjs"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
dayjs.extend(isSameOrAfter)
import { observer } from "mobx-react"
import { useContext, useEffect, useState } from "react"
import UnauthorizedUser from "../../components/unauthorized-user/unauthorized-user"
import useSetPatientDashboardData from "src/custom-hooks/use-set-patient-dashboard-data"
import PatientHeader from "./patient-header"
import UpcomingAppointmentsSection from "src/components/patient-dashboard/upcoming-appointments/upcoming-appointments-section"
import PastAppointmentsSection from "src/components/patient-dashboard/past-appointments/past-appointments-section"
import PersonalInfo from "src/components/patient-dashboard/personal-info"
import AppContext from "src/contexts/maroon-context"

function PatientDashboard() {
	const appContext = useContext(AppContext)
	const [pastAppointments, setPastAppointments] = useState<PatientDashboardData[]>([])
	const [upcomingAppointments, setUpcomingAppointments] = useState<PatientDashboardData[]>([])

	useEffect(() => {
		if (
			_.isNil(appContext.patientData?.patientDashboardData) ||
			_.isEmpty(appContext.patientData?.patientDashboardData) ||
			appContext.auth.userType !== "Patient"
		) return

		const now = dayjs()
		const pastPatientAppointments = appContext.patientData?.patientDashboardData.filter(appointment =>
			dayjs(appointment.appointmentDate, "MMMM D, YYYY, h:mm A").isBefore(now)
		)
		const upcomingPatientAppointments = appContext.patientData?.patientDashboardData.filter(appointment =>
			dayjs(appointment.appointmentDate, "MMMM D, YYYY, h:mm A").isSameOrAfter(now)
		)

		if (!_.isNil(pastPatientAppointments)) setPastAppointments(pastPatientAppointments)
		if (!_.isNil(upcomingPatientAppointments)) setUpcomingAppointments(upcomingPatientAppointments)
	}, [appContext.patientData?.patientDashboardData])

	useSetPatientDashboardData()

	if (appContext.auth.userType !== "Patient") return <UnauthorizedUser vetOrpatient = {"patient"}/>

	function DashboardData () {
		if (_.isEmpty(appContext.patientData?.patientDashboardData)) return <>No upcoming appointments</>
		return (
			<>
				<UpcomingAppointmentsSection upcomingAppointments = {upcomingAppointments} />
				<PastAppointmentsSection pastAppointments = {pastAppointments}/>
			</>
		)
	}

	return (
		<div>
			<PatientHeader />
			<PersonalInfo />
			<DashboardData />
		</div>
	)
}

export default observer(PatientDashboard)
