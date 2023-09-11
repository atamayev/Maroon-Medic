import _ from "lodash"
import moment from "moment"
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
	const { dashboardData, setDashboardData } = useSetDoctorDashboardData()
	const [personalInfo, setPersonalInfo] = useState<BirthDateInfo | null>(appContext.personalInfo)
	const [pastAppointments, setPastAppointments] = useState<DoctorDashboardData[]>([])
	const [upcomingAppointments, setUpcomingAppointments] = useState<DoctorDashboardData[]>([])

	useEffect(() => {
		if (appContext.userType !== "Doctor") return
		const interval = setInterval(() => {
			if (appContext.personalInfo) {
				setPersonalInfo(appContext.personalInfo)
				// Clear the interval once the data is set
				clearInterval(interval)
			}
			// Check every 10 miliseconds
		}, 10)

		// Clean up interval on unmount
		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		if (!_.isEmpty(dashboardData) && appContext.userType === "Doctor") {
			const now = moment()
			const pastDoctorAppointments = dashboardData.filter(appointment =>
				moment(appointment.appointmentDate, "MMMM Do, YYYY, h:mm A") < now
			)
			const upcomingDoctorAppointments = dashboardData.filter(appointment =>
				moment(appointment.appointmentDate, "MMMM Do, YYYY, h:mm A") >= now
			)

			setPastAppointments(pastDoctorAppointments)
			setUpcomingAppointments(upcomingDoctorAppointments)
		}
	}, [dashboardData])

	if (appContext.userType !== "Doctor") return <UnauthorizedUser vetOrpatient = {"vet"}/>

	function DashboardData () {
		if (_.isEmpty(dashboardData)) return <>No upcoming appointments</>
		return (
			<>
				<UpcomingAppointmentsSection
					upcomingDoctorAppointments = {upcomingAppointments}
					dashboardData = {dashboardData}
					setDashboardData = {setDashboardData}
				/>
				<PastAppointmentsSection pastAppointments = {pastAppointments}/>
			</>
		)
	}

	return (
		<>
			<DoctorHeader/>
			<PersonalInfo personalInfo = {personalInfo} />
			<DashboardData />
		</>
	)
}

export default observer(DoctorDashboard)
