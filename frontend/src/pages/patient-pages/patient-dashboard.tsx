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
	const { dashboardData } = useSetPatientDashboardData()
	const [pastAppointments, setPastAppointments] = useState<PatientDashboardData[]>([])
	const [upcomingAppointments, setUpcomingAppointments] = useState<PatientDashboardData[]>([])

	useEffect(() => {
		if (!_.isEmpty(dashboardData) && appContext.userType === "Patient") {
			const now = moment()
			const pastPatientAppointments = dashboardData.filter(appointment =>
				moment(appointment.appointmentDate, "MMMM Do, YYYY, h:mm A") < now
			)
			const upcomingPatientAppointments = dashboardData.filter(appointment =>
				moment(appointment.appointmentDate, "MMMM Do, YYYY, h:mm A") >= now
			)

			setPastAppointments(pastPatientAppointments)
			setUpcomingAppointments(upcomingPatientAppointments)
		}
	}, [dashboardData])

	if (appContext.userType !== "Patient") return <UnauthorizedUser vetOrpatient = {"patient"}/>

	function DashboardData () {
		if (_.isEmpty(dashboardData)) return <>No upcoming appointments</>
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
