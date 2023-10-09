import _ from "lodash"
import dayjs from "dayjs"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
dayjs.extend(isSameOrAfter)
import { observer } from "mobx-react"
import { useContext, useState } from "react"
import UnauthorizedUser from "../../components/unauthorized-user/unauthorized-user"
import useFetchAndSetDoctorDashboardData from "src/custom-hooks/private-doctor/use-fetch-and-set-doctor-dashboard-data"
import DoctorHeader from "./doctor-header"
import PastAppointmentsSection from "src/components/doctor-dashboard/past-appointments/past-appointments-section"
import UpcomingAppointmentsSection from "src/components/doctor-dashboard/upcoming-appointments/upcoming-appointments-section"
import AppContext from "src/contexts/maroon-context"
import useSetDoctorAppointmentsdData from "src/custom-hooks/private-doctor/use-set-doctor-appointments-data"

function DoctorDashboard() {
	const appContext = useContext(AppContext)
	const [pastAppointments, setPastAppointments] = useState<DoctorDashboardData[]>([])
	const [upcomingAppointments, setUpcomingAppointments] = useState<DoctorDashboardData[]>([])

	useSetDoctorAppointmentsdData(setPastAppointments, setUpcomingAppointments)

	useFetchAndSetDoctorDashboardData()

	if (appContext.auth.userType !== "Doctor") return <UnauthorizedUser vetOrpatient = {"vet"}/>

	function DashboardData () {
		if (_.isNull(appContext.privateDoctorData)) return null
		if (_.isEmpty(appContext.privateDoctorData.doctorDashboardData)) return <>No upcoming appointments</>
		return (
			<>
				<UpcomingAppointmentsSection upcomingDoctorAppointments = {upcomingAppointments} />
				<PastAppointmentsSection pastAppointments = {pastAppointments} />
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
