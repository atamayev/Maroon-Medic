export default function convertInstantBook (apppointmentObject: AppointmentObject): DoctorConfirmationStatuses {
	const instantBookBoolean = Boolean(apppointmentObject.instantBook)
	if (instantBookBoolean === true) return "Approved"
	else return "Pending"
}
