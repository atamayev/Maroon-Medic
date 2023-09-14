import _ from "lodash"
import moment from "moment"
import { observer } from "mobx-react"
import { useContext, useEffect, useState } from "react"
import UnauthorizedUser from "../../components/unauthorized-user/unauthorized-user"
import useSetPatientDashboardData from "src/custom-hooks/use-set-patient-dashboard-data"
import PatientHeader from "./patient-header"
import UpcomingAppointmentsSection from "src/components/patient-dashboard/upcoming-appointments/upcoming-appointments-section"
import PastAppointmentsSection from "src/components/patient-dashboard/past-appointments/past-appointments-section"
import PersonalInfo from "src/components/patient-dashboard/personal-info"
import { AppContext } from "src/contexts/maroon-context"

function PatientDashboard() {
	const appContext = useContext(AppContext)
	const [pastAppointments, setPastAppointments] = useState<PatientDashboardData[]>([])
	const [upcomingAppointments, setUpcomingAppointments] = useState<PatientDashboardData[]>([])

	useEffect(() => {
		if (
			_.isNull(appContext.patientDashboardData) ||
			_.isEmpty(appContext.patientDashboardData) ||
			appContext.userType !== "Patient"
		) return

		const now = moment()
		const pastPatientAppointments = appContext.patientDashboardData.filter(appointment =>
			moment(appointment.appointmentDate, "MMMM Do, YYYY, h:mm A") < now
		)
		const upcomingPatientAppointments = appContext.patientDashboardData.filter(appointment =>
			moment(appointment.appointmentDate, "MMMM Do, YYYY, h:mm A") >= now
		)

		setPastAppointments(pastPatientAppointments)
		setUpcomingAppointments(upcomingPatientAppointments)
	}, [appContext.patientDashboardData])

	useSetPatientDashboardData()

	if (appContext.userType !== "Patient") return <UnauthorizedUser vetOrpatient = {"patient"}/>

	function DashboardData () {
		if (_.isEmpty(appContext.patientDashboardData)) return <>No upcoming appointments</>
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
