import _ from "lodash"
import moment from "moment"
import { useEffect, useState } from "react"
import UnauthorizedUser from "../../components/unauthorized-user/unauthorized-user"
import { useDoctorDashboardData } from "../../custom-hooks/fetch-and-use-dashboard-info"
import useSimpleUserVerification from "../../custom-hooks/use-simple-user-verification"
import Header from "../../components/header/header"
import DoctorHeader from "./doctor-header"
import PersonalInfo from "src/components/doctor-dashboard/personal-info"
import PastAppointmentsSection from "src/components/doctor-dashboard/past-appointments/past-appointments-section"
import UpcomingAppointmentsSection from "src/components/doctor-dashboard/upcoming-appointments/upcoming-appointments-section"

export default function DoctorDashboard() {
  const { userType } = useSimpleUserVerification()
  const { dashboardData, setDashboardData } = useDoctorDashboardData()
  const storedData = sessionStorage.getItem("DoctorPersonalInfo")
  const parsedData = storedData && JSON.parse(storedData)
  const [personalInfo, setPersonalInfo] = useState(parsedData)
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
        moment(appointment.appointment_date, "MMMM Do, YYYY, h:mm A") < now
      )
      const upcomingDoctorAppointments = dashboardData.filter(appointment =>
        moment(appointment.appointment_date, "MMMM Do, YYYY, h:mm A") >= now
      )

      setPastAppointments(pastDoctorAppointments)
      setUpcomingAppointments(upcomingDoctorAppointments)
    }
  }, [dashboardData])

  if (userType !== "Doctor") return <UnauthorizedUser vetOrpatient = {"vet"}/>

  const DashboardData = () => {
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
      <Header dropdown = {true}/>
      <DoctorHeader/>
      <PersonalInfo personalInfo = {personalInfo} />
      <DashboardData />
    </>
  )
}
