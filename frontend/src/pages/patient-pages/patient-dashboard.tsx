import _ from "lodash"
import moment from "moment"
import { useEffect, useState } from "react"
import { Card, Badge, Tooltip } from "react-bootstrap"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import { UnauthorizedUser } from "../../components/user-type-unauth"
import { usePatientDashboardData } from "../../custom-hooks/fetch-and-use-dashboard-info"
import useSimpleUserVerification from "../../custom-hooks/use-simple-user-verification"
import Header from "../header"
import PatientHeader from "./patient-header"
import CheckCookie from "src/utils/cookie-check"

export default function PatientDashboard() {
  const { userType } = useSimpleUserVerification()
  const { dashboardData } = usePatientDashboardData()
  const storedData = sessionStorage.getItem("PatientPersonalInfo")
  const parsedData = storedData && JSON.parse(storedData)
  const [personalInfo, setPersonalInfo] = useState(parsedData)
  const [pastAppointments, setPastAppointments] = useState<PatientDashboardData[]>([])
  const [upcomingAppointments, setUpcomingAppointments] = useState<PatientDashboardData[]>([])
  const newPatient = CheckCookie.forNewUser("PatientNewUser")

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
      const pastAppointments = dashboardData.filter(appointment =>
        moment(appointment.appointment_date, "MMMM Do, YYYY, h:mm A") < now
      )
      const upcomingAppointments = dashboardData.filter(appointment =>
        moment(appointment.appointment_date, "MMMM Do, YYYY, h:mm A") >= now
      )

      setPastAppointments(pastAppointments)
      setUpcomingAppointments(upcomingAppointments)
    }
  }, [dashboardData])

  if (userType !== "Patient") return <UnauthorizedUser patientOrDoctor = {"patient"}/>

  const RenderAppointmentConfirmationStatus = ({appointment} : {appointment: PatientDashboardData}) => {
    if (appointment.Doctor_confirmation_status === false) {
      return (
        <OverlayTrigger
          placement = "top"
          overlay = {<Tooltip id = {"tooltip-top"}>Dr. {appointment.Doctor_FirstName} has not yet approved your appointment.</Tooltip>}
        >
          <Badge pill style = {{ position: "absolute", top: "10px", right: "10px", border: "2px solid yellow" }}>
            Pending approval
          </Badge>
        </OverlayTrigger>
      )
    }
    return (
      <OverlayTrigger
        placement = "top"
        overlay = {<Tooltip id = {"tooltip-top"}>Dr. {appointment.Doctor_FirstName} is looking forward to the appointment.</Tooltip>}
      >
        <Badge pill style = {{ position: "absolute", top: "10px", right: "10px" }}>
          Appointment approved
        </Badge>
      </OverlayTrigger>
    )
  }

  const RenderMessageSection = ({appointment} : {appointment: PatientDashboardData}) => {
    if (!appointment.patient_message) return null
    return (
      <span style = {{ display: "block" }}>
        Your Message: {""}
        {appointment.patient_message}
      </span>
    )
  }

  const UpcomingAppointmentCard = ({appointment}: {appointment: PatientDashboardData}) => {
    return (
      <>
        <Card style = {{ margin: "0 10px", position: "relative" }}>
          <Card.Body>
            <Card.Title>
              Appointment with Dr. {appointment.Doctor_FirstName} {appointment.Doctor_LastName} on {appointment.appointment_date}
              <RenderAppointmentConfirmationStatus appointment = {appointment} />
            </Card.Title>
            <Card.Text>
              <RenderMessageSection appointment = {appointment} />
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    )
  }

  const PastAppointmentCard = ({appointment}: {appointment: PatientDashboardData}) => {
    return (
      <>
        <Card style = {{ margin: "0 10px", position: "relative" }}>
          <Card.Body>
            <Card.Title>
              Appointment with Dr. {appointment.Doctor_FirstName} {appointment.Doctor_LastName} on {appointment.appointment_date}
              <RenderAppointmentConfirmationStatus appointment = {appointment} />
            </Card.Title>
          </Card.Body>
        </Card>
      </>
    )
  }

  const RenderUpcomingAppointments = ({upcomingAppointments} : {upcomingAppointments: PatientDashboardData[]}) => {
    if (_.isEmpty(upcomingAppointments)) return <>No upcoming appointments</>
    return (
      <>
        {upcomingAppointments.map((appointment) => (
          <UpcomingAppointmentCard key = {appointment.appointmentsID} appointment = {appointment} />
        ))}
      </>
    )
  }

  const RenderPastAppointments = ({pastAppointments} : {pastAppointments: PatientDashboardData[]}) => {
    if (_.isEmpty(pastAppointments)) return <>No past appointments</>
    return (
      <>
        {pastAppointments.map((appointment) => (
          <PastAppointmentCard key = {appointment.appointmentsID} appointment = {appointment} />
        ))}
      </>
    )
  }

  const RenderUpcomingAppointmentsCard = () => {
    return (
      <>
        <Card style = {{margin: "0 10px" }} className = "mb-3">
          <Card.Header>
            <h1>Upcoming Appointments</h1>
          </Card.Header>
          <Card.Body>
            <RenderUpcomingAppointments upcomingAppointments = {upcomingAppointments} />
          </Card.Body>
        </Card>
      </>
    )
  }

  const RenderPastAppointmentsCard = () => {
    return (
      <>
        <Card style = {{margin: "0 10px" }}>
          <Card.Header>
            <h1>Past Appointments</h1>
          </Card.Header>
          <Card.Body>
            <RenderPastAppointments pastAppointments = {pastAppointments} />
          </Card.Body>
        </Card>
      </>
    )
  }

  const RenderDashboardData = () => {
    if (_.isEmpty(dashboardData)) return <>No upcoming appointments</>
    return (
      <>
        <RenderUpcomingAppointmentsCard />
        <RenderPastAppointmentsCard />
      </>
    )
  }

  const WelcomeOrBack = () => {
    if (newPatient) return <> to MaroonMedic</>
    return <> back</>
  }

  const RenderisPersonalInfo = () => {
    if (!personalInfo) return <>Loading...</>
    return <p>Welcome{WelcomeOrBack()}, {personalInfo.FirstName}</p>
  }

  return (
    <div>
      <Header dropdown = {true} search = {true} />
      <PatientHeader />
      <RenderisPersonalInfo />
      <RenderDashboardData />
    </div>
  )
}
