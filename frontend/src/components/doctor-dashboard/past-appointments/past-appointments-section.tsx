import PastAppointmentsMap from "./past-appointments-map"

const PastAppointmentsSection = ({ pastAppointments }: { pastAppointments: DoctorDashboardData[] }) => {
  return (
    <div className="border border-brown-400 bg-yellow-100 rounded" style={{ margin: "0 10px" }}>
      <div className="p-4 bg-amber-400 text-white">
        <h1>Past Appointments</h1>
      </div>
      <div className="p-4">
        <PastAppointmentsMap pastDoctorAppointments={pastAppointments} />
      </div>
    </div>
  )
}

export default PastAppointmentsSection
