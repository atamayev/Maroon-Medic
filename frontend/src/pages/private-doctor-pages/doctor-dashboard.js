import _ from "lodash"
import moment from "moment"
import { useEffect, useState } from "react"
import { Card, Badge, Button } from "react-bootstrap"
import { NonDoctorAccess } from "../../components/user-type-unauth.js"
import PrivateDoctorDataService from "../../services/private-doctor-data-service.js"
import { invalidUserAction } from "../../custom-hooks/user-verification-snippets.js"
import { useDashboardData } from "../../custom-hooks/fetch-and-use-dashboard-info.js"
import useSimpleUserVerification from "../../custom-hooks/use-simple-user-verification.js"
import Header from "../header.js"
import DoctorHeader from "./doctor-header.js"

async function approveAppointment (setStatus, AppointmentsID, dashboardData, setDashboardData) {
  try {
    const response = await PrivateDoctorDataService.confirmAppointment(AppointmentsID)
    if (response.status === 200) {
      // Update the Doctor_confirmation_status for the specific appointment
      const updatedDashboardData = dashboardData.map(appointment => {
        if (appointment.AppointmentsID === AppointmentsID) return { ...appointment, Doctor_confirmation_status: 1 }
        return appointment
      })
      setDashboardData(updatedDashboardData)
      setStatus("approved")
    } else {
      setStatus("pending")
    }
  } catch(error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setStatus("pending")
  }
}

export default function DoctorDashboard() {
  const { userType } = useSimpleUserVerification()
  const { dashboardData, setDashboardData } = useDashboardData(userType)
  const [personalInfo, setPersonalInfo] = useState(JSON.parse(sessionStorage.getItem("DoctorPersonalInfo")))
  const [pastAppointments, setPastAppointments] = useState([])
  const [upcomingAppointments, setUpcomingAppointments] = useState([])
  const newDoctor = document.cookie.split("").some((item) => item.trim().startsWith("DoctorNewUser"))

  useEffect(() => {
    const interval = setInterval(() => {
      const sessionInfo = sessionStorage.getItem("DoctorPersonalInfo")
      if (sessionInfo) {
        setPersonalInfo(JSON.parse(sessionInfo))
        clearInterval(interval) // Clear the interval once the data is set
      }
    }, 10) // Check every 10 miliseconds

    // Clean up interval on unmount
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!_.isEmpty(dashboardData)) {
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

  if (userType !== "Doctor") return <NonDoctorAccess/>

  const returnDoctorConfirmationStatus = (appointment) => {
    if (appointment.Doctor_confirmation_status === 0) return "pending"
    return "approved"
  }

  const renderPendingAppointment = (status, setStatus) => {
    if (status !== "pending") return null
    return <Button variant = "warning" onClick = {() => {setStatus("confirming")}}>Pending approval</Button>
  }

  const renderConfirmedAppointment = (status, setStatus, appointment) => {
    if (status !== "confirming") return null
    return (
      <span style={{ display: "block" }}>
        <Button variant = "success" onClick = {e => approveAppointment(setStatus, appointment.AppointmentsID, dashboardData, setDashboardData)}>Approve Appointment</Button>
        <Button variant = "danger" onClick = {() => setStatus("pending")}>X</Button>
      </span>
    )
  }

  const renderApprovedAppointment = (status) => {
    if (status !== "approved") return null
    return (
      <Badge pill variant = "success" style = {{ position: "absolute", top: "10px", right: "10px" }}>
        Appointment approved
      </Badge>
    )
  }

  const renderMessageSection = (appointment) => {
    if (!appointment.patient_message) return null
    return (
      <span style={{ display: "block" }}>
        Patient Message:
        {" " + appointment.patient_message}
      </span>
    )
  }

  const UpcomingAppointmentCard = ({ appointment }) => {
    const [status, setStatus] = useState(returnDoctorConfirmationStatus(appointment))

    return (
      <Card style = {{ margin: "0 10px", position: "relative" }} className = "mb-3">
        <Card.Body>
          <Card.Title>
            Appointment with {appointment.Patient_FirstName} {appointment.Patient_LastName} on {appointment.appointment_date}
          </Card.Title>
          <Card.Text>
            {renderMessageSection(appointment)}
            {renderPendingAppointment(status, setStatus)}
            {renderConfirmedAppointment(status, setStatus, appointment)}
            {renderApprovedAppointment(status)}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }

  const PastAppointmentCard = ({ appointment }) => {
    return (
      <Card style = {{ margin: "0 10px", position: "relative" }} className = "mb-3">
        <Card.Body>
          <Card.Title>
            Appointment with {appointment.Patient_FirstName} {appointment.Patient_LastName} on {appointment.appointment_date}
          </Card.Title>
        </Card.Body>
      </Card>
    )
  }

  const renderUpcomingAppointments = (upcomingAppointments) => {
    if (_.isEmpty(upcomingAppointments)) return <>No upcoming appointments</>
    return (
      <>
        {upcomingAppointments.map((appointment) => (
          <UpcomingAppointmentCard key = {appointment.AppointmentsID} appointment = {appointment} />
        ))}
      </>
    )
  }

  const renderPastAppointments = (pastAppointments) => {
    if (_.isEmpty(pastAppointments)) return <>No past appointments</>
    return (
      <>
        {pastAppointments.map((appointment) => (
          <PastAppointmentCard key = {appointment.AppointmentsID} appointment = {appointment} />
        ))}
      </>
    )
  }

  const renderUpcomingAppointmentsCard = () => {
    return (
      <Card style = {{margin: "0 10px" }}className = "mb-3">
        <Card.Header>
          <h1>Upcoming Appointments</h1>
        </Card.Header>
        <Card.Body>
          {renderUpcomingAppointments(upcomingAppointments)}
        </Card.Body>
      </Card>
    )
  }

  const renderPastAppointmentsCard = () => {
    return (
      <Card style = {{margin: "0 10px" }}>
        <Card.Header>
          <h1>Past Appointments</h1>
        </Card.Header>
        <Card.Body>
          {renderPastAppointments(pastAppointments)}
        </Card.Body>
      </Card>
    )
  }

  const renderDashboardData = () => {
    if (_.isEmpty(dashboardData)) return <>No upcoming appointments</>
    return (
      <>
        {renderUpcomingAppointmentsCard()}
        {renderPastAppointmentsCard()}
      </>
    )
  }

  const renderWelcomeOrBack = () => {
    if (newDoctor) return <> to MaroonMedic</>
    return <> back</>
  }

  const renderisPersonalInfo = () => {
    if (!personalInfo) return <>Loading...</>
    return <p>Welcome{renderWelcomeOrBack()}, Dr. {personalInfo.LastName}</p>
  }

  return (
    <>
      <Header dropdown = {true}/>
      <DoctorHeader/>
      {renderisPersonalInfo()}
      {renderDashboardData()}
    </>
  )
}
