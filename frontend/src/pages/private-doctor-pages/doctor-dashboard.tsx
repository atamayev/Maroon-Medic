import _ from "lodash"
import moment from "moment"
import { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { Card, Badge, Button } from "react-bootstrap"
import { UnauthorizedUser } from "../../components/user-type-unauth"
import CalendarDataService from "../../services/calendar-data-service"
import { invalidUserAction } from "../../custom-hooks/user-verification-snippets"
import { useDoctorDashboardData } from "../../custom-hooks/fetch-and-use-dashboard-info"
import useSimpleUserVerification from "../../custom-hooks/use-simple-user-verification"
import Header from "../header"
import DoctorHeader from "./doctor-header"
import CookieUtils from "src/utils/cookie"

async function approveAppointment (
  setStatus: React.Dispatch<React.SetStateAction<AppointmentStatusType>>,
  appointmentsID: number,
  dashboardData: DoctorDashboardDataType[],
  setDashboardData: React.Dispatch<React.SetStateAction<DoctorDashboardDataType[]>>
) {
  try {
    const response = await CalendarDataService.confirmAppointment(appointmentsID)
    if (response.status === 200) {
      // Update the Doctor_confirmation_status for the specific appointment
      const updatedDashboardData = dashboardData.map(appointment => {
        if (appointment.appointmentsID === appointmentsID) return { ...appointment, Doctor_confirmation_status: true }
        return appointment
      })
      setDashboardData(updatedDashboardData)
      setStatus("approved")
    } else {
      setStatus("pending")
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        invalidUserAction(error.response.data)
      }
    }
    else setStatus("pending")
  }
}

export default function DoctorDashboard() {
  const { userType } = useSimpleUserVerification()
  const { dashboardData, setDashboardData } = useDoctorDashboardData()
  const storedData = sessionStorage.getItem("DoctorPersonalInfo")
  const parsedData = storedData && JSON.parse(storedData)
  const [personalInfo, setPersonalInfo] = useState(parsedData)
  const [pastAppointments, setPastAppointments] = useState<DoctorDashboardDataType[]>([])
  const [upcomingAppointments, setUpcomingAppointments] = useState<DoctorDashboardDataType[]>([])
  const newDoctor = CookieUtils.checkCookieForNewUser("DoctorNewUser")

  useEffect(() => {
    if (userType !== "Doctor") return
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
    if (!_.isEmpty(dashboardData) && userType === "Doctor") {
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

  if (userType !== "Doctor") return <UnauthorizedUser patientOrDoctor = {"vet"}/>

  const returnDoctorConfirmationStatus = (appointment: DoctorDashboardDataType) => {
    if (appointment.Doctor_confirmation_status === false) return "pending"
    return "approved"
  }

  const RenderPendingAppointment = ({ status, setStatus } :
    { status: AppointmentStatusType,
      setStatus: React.Dispatch<React.SetStateAction<AppointmentStatusType>>
    }
  ) => {
    if (status !== "pending") return null
    return (
      <Button
        variant = "warning"
        onClick = {() => {setStatus("confirming")}}
      >
        Pending approval
      </Button>
    )
  }

  const RenderConfirmedAppointment = ( { status, setStatus, appointment } :
    { status: AppointmentStatusType,
      setStatus: React.Dispatch<React.SetStateAction<AppointmentStatusType>>,
      appointment: DoctorDashboardDataType
    }
  ) => {
    if (status !== "confirming") return null
    return (
      <span style={{ display: "block" }}>
        <Button
          variant = "success"
          onClick = {() => approveAppointment(setStatus, appointment.appointmentsID, dashboardData, setDashboardData)}
        >
          Approve Appointment
        </Button>
        <Button variant = "danger" onClick = {() => setStatus("pending")}>X</Button>
      </span>
    )
  }

  const RenderApprovedAppointment = ({ status } : { status: AppointmentStatusType }) => {
    if (status !== "approved") return null
    return (
      <Badge pill style = {{ position: "absolute", top: "10px", right: "10px" }}>
        Appointment approved
      </Badge>
    )
  }

  const RenderMessageSection = ({ appointment }: { appointment: DoctorDashboardDataType }) => {
    if (!appointment.patient_message) return null
    return (
      <span style={{ display: "block" }}>
        Patient Message:
        {" " + appointment.patient_message}
      </span>
    )
  }

  const UpcomingAppointmentCard = ({ appointment }: { appointment: DoctorDashboardDataType }) => {
    const [status, setStatus] = useState<AppointmentStatusType>(returnDoctorConfirmationStatus(appointment))

    return (
      <Card style = {{ margin: "0 10px", position: "relative" }} className = "mb-3">
        <Card.Body>
          <Card.Title>
            Appointment with {appointment.Patient_FirstName} {appointment.Patient_LastName} on {appointment.appointment_date}
          </Card.Title>
          <Card.Text>
            <RenderMessageSection appointment = {appointment} />
            <RenderPendingAppointment status = {status} setStatus = {setStatus} />
            <RenderConfirmedAppointment status = {status} setStatus = {setStatus} appointment = {appointment} />
            <RenderApprovedAppointment status = {status} />
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }

  const PastAppointmentCard = ({ appointment }: { appointment: DoctorDashboardDataType }) => {
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

  const RenderUpcomingAppointments = ({ upcomingAppointments }: { upcomingAppointments: DoctorDashboardDataType[] }) => {
    if (_.isEmpty(upcomingAppointments)) return <>No upcoming appointments</>
    return (
      <>
        {upcomingAppointments.map((appointment) => (
          <UpcomingAppointmentCard key = {appointment.appointmentsID} appointment = {appointment} />
        ))}
      </>
    )
  }

  const RenderPastAppointments = ({ pastAppointments } : { pastAppointments: DoctorDashboardDataType[] }) => {
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
      <Card style = {{margin: "0 10px" }}className = "mb-3">
        <Card.Header>
          <h1>Upcoming Appointments</h1>
        </Card.Header>
        <Card.Body>
          <RenderUpcomingAppointments upcomingAppointments = {upcomingAppointments} />
        </Card.Body>
      </Card>
    )
  }

  const RenderPastAppointmentsCard = () => {
    return (
      <Card style = {{margin: "0 10px" }}>
        <Card.Header>
          <h1>Past Appointments</h1>
        </Card.Header>
        <Card.Body>
          <RenderPastAppointments pastAppointments = {pastAppointments} />
        </Card.Body>
      </Card>
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
    if (newDoctor) return <> to MaroonMedic</>
    return <> back</>
  }

  const RenderisPersonalInfo = () => {
    if (!personalInfo) return <>Loading...</>
    return <p>Welcome{WelcomeOrBack()}, Dr. {_.upperFirst(personalInfo.LastName || "")}</p>
  }

  return (
    <>
      <Header dropdown = {true}/>
      <DoctorHeader/>
      <RenderisPersonalInfo />
      <RenderDashboardData />
    </>
  )
}
