import { useState } from "react"
import MessageSection from "../message-section"
import PendingAppointment from "../pending-appointment"
import ConfirmedAppointment from "../confirmed-appointment"
import ApprovedAppointment from "../approved-appointment"

const returnDoctorConfirmationStatus = (appointment: DoctorDashboardData) => {
  if (appointment.Doctor_confirmation_status === false) return "pending"
  return "approved"
}

const UpcomingAppointmentCard = ({ appointment, dashboardData, setDashboardData } :
  { appointment: DoctorDashboardData,
    dashboardData: DoctorDashboardData[],
    setDashboardData: React.Dispatch<React.SetStateAction<DoctorDashboardData[]>>
  }) => {
  const [status, setStatus] = useState<AppointmentStatus>(returnDoctorConfirmationStatus(appointment))

  return (
    <div className="mb-3 relative border border-brown-400 bg-yellow-100 rounded" style={{ margin: "0 10px" }}>
      <div className="p-4">
        <h1 className="text-brown-800 text-lg">
          Appointment with {appointment.Patient_FirstName} {appointment.Patient_LastName} on {appointment.appointment_date}
        </h1>
        <div>
          <MessageSection appointment={appointment} />
          <PendingAppointment status={status} setStatus={setStatus} />
          <ConfirmedAppointment
            status={status}
            setStatus={setStatus}
            appointment={appointment}
            dashboardData={dashboardData}
            setDashboardData={setDashboardData}
          />
          <ApprovedAppointment status={status} />
        </div>
      </div>
    </div>
  )
}

export default UpcomingAppointmentCard
