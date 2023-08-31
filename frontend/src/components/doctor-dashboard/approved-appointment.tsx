export default function ApprovedAppointment ({ status } : { status: AppointmentStatus }) {
	if (status !== "approved") return null
	return (
		<div className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white rounded-full">
			Appointment approved
		</div>
	)
}
