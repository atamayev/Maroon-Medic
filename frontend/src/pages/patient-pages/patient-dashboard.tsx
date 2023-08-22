import _ from "lodash"
import moment from "moment"
import { useEffect, useState } from "react"
import UnauthorizedUser from "../../components/unauthorized-user/unauthorized-user"
import useRetrievePatientDashboardData from "src/custom-hooks/use-retrieve-patient-dashboard-data"
import useSimpleUserVerification from "../../custom-hooks/use-simple-user-verification"
import Header from "../../components/header/header"
import PatientHeader from "./patient-header"
import UpcomingAppointmentsSection from "src/components/patient-dashboard/upcoming-appointments/upcoming-appointments-section"
import PastAppointmentsSection from "src/components/patient-dashboard/past-appointments/past-appointments-section"
import PersonalInfo from "src/components/patient-dashboard/personal-info"

export default function PatientDashboard() {
  const { userType } = useSimpleUserVerification()
  const { dashboardData } = useRetrievePatientDashboardData()
  const storedData = sessionStorage.getItem("PatientPersonalInfo")
  const parsedData = storedData && JSON.parse(storedData)
  const [personalInfo, setPersonalInfo] = useState(parsedData as BirthDateInfo)
  const [pastAppointments, setPastAppointments] = useState<PatientDashboardData[]>([])
  const [upcomingAppointments, setUpcomingAppointments] = useState<PatientDashboardData[]>([])

  useEffect(() => {
    if (userType !== "Patient") return
    const interval = setInterval(() => {
      const sessionInfo = sessionStorage.getItem("PatientPersonalInfo")
      if (sessionInfo) {
        setPersonalInfo(JSON.parse(sessionInfo))
        // Clear the interval once the data is set
        clearInterval(interval)
      }
      // Check every 10 miliseconds
    }, 10)

    // Clean up interval on unmount
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!_.isEmpty(dashboardData) && userType === "Patient") {
      const now = moment()
      const pastPatientAppointments = dashboardData.filter(appointment =>
        moment(appointment.appointment_date, "MMMM Do, YYYY, h:mm A") < now
      )
      const upcomingPatientAppointments = dashboardData.filter(appointment =>
        moment(appointment.appointment_date, "MMMM Do, YYYY, h:mm A") >= now
      )

      setPastAppointments(pastPatientAppointments)
      setUpcomingAppointments(upcomingPatientAppointments)
    }
  }, [dashboardData])

  if (userType !== "Patient") return <UnauthorizedUser vetOrpatient = {"patient"}/>

  const DashboardData = () => {
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
      <Header dropdown = {true} search = {true} />
      <PatientHeader />
      <PersonalInfo personalInfo = {personalInfo} />
      <DashboardData />
    </div>
  )
}
