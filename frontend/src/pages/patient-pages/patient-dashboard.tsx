import _ from "lodash"
import dayjs from "dayjs"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
dayjs.extend(isSameOrAfter)
import { observer } from "mobx-react"
import { useContext, useState } from "react"
import UnauthorizedUser from "../../components/unauthorized-user/unauthorized-user"
import useFetchAndSetPatientDashboardData from "src/custom-hooks/patient/use-fetch-and-set-patient-dashboard-data"
import PatientHeader from "./patient-header"
import UpcomingAppointmentsSection from "src/components/patient-dashboard/upcoming-appointments/upcoming-appointments-section"
import PastAppointmentsSection from "src/components/patient-dashboard/past-appointments/past-appointments-section"
import AppContext from "src/contexts/maroon-context"
import useSetPatientAppointmentsdData from "src/custom-hooks/patient/use-set-patient-appointments-data"

function PatientDashboard() {
	const appContext = useContext(AppContext)
	const [pastAppointments, setPastAppointments] = useState<PatientDashboardData[]>([])
	const [upcomingAppointments, setUpcomingAppointments] = useState<PatientDashboardData[]>([])

	useSetPatientAppointmentsdData(setPastAppointments, setUpcomingAppointments)

	useFetchAndSetPatientDashboardData()

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
			<DashboardData />
		</div>
	)
}

export default observer(PatientDashboard)
