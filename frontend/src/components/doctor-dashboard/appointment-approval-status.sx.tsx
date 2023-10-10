interface Props {
	status: AppointmentStatus
}

export default function AppointmentApprovalStatus (props: Props) {
	const { status } = props

	if (status === "pending" || status === "confirming-approval" || status === "confirming-denied") {
		return (
			<div className="absolute top-2 right-2 px-2 py-1 bg-yellow-500 text-white rounded-full">
				Appointment pending approval
			</div>
		)
	}
	return (
		<div className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white rounded-full">
			Appointment approved
		</div>
	)
}
