import _ from "lodash"
import moment from "moment"
import { useEffect, useState } from "react"
import UnauthorizedUser from "../../components/unauthorized-user/unauthorized-user"
import useSetDoctorDashboardData from "src/custom-hooks/use-set-doctor-dashboard-data"
import useSimpleUserVerification from "../../custom-hooks/use-simple-user-verification"
import DoctorHeader from "./doctor-header"
import PersonalInfo from "src/components/doctor-dashboard/personal-info"
import PastAppointmentsSection from "src/components/doctor-dashboard/past-appointments/past-appointments-section"
import UpcomingAppointmentsSection from "src/components/doctor-dashboard/upcoming-appointments/upcoming-appointments-section"
import retrieveFromSessionStorage from "src/utils/retrieve-from-session-storage"

export default function DoctorDashboard() {
	const { userType } = useSimpleUserVerification()
	const { dashboardData, setDashboardData } = useSetDoctorDashboardData()
	const doctorPersonalInfo = retrieveFromSessionStorage("DoctorPersonalInfo")
	const [personalInfo, setPersonalInfo] = useState<BirthDateInfo | null>(doctorPersonalInfo)
	const [pastAppointments, setPastAppointments] = useState<DoctorDashboardData[]>([])
	const [upcomingAppointments, setUpcomingAppointments] = useState<DoctorDashboardData[]>([])

	useEffect(() => {
		if (userType !== "Doctor") return
		const interval = setInterval(() => {
			const sessionInfo = sessionStorage.getItem("DoctorPersonalInfo")
			if (sessionInfo) {
				setPersonalInfo(JSON.parse(sessionInfo))
				clearInterval(interval)
			}
			// Check every 10 miliseconds
		}, 10)

		// Clean up interval on unmount
		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		if (!_.isEmpty(dashboardData) && userType === "Doctor") {
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

	if (userType !== "Doctor") return <UnauthorizedUser vetOrpatient = {"vet"}/>

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
