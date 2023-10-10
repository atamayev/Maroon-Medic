import { useState, useEffect } from "react"
import UpcomingAppointmentsMap from "./upcoming-appointments-map"

interface Props {
	upcomingDoctorAppointments: DoctorDashboardData[]
}

export default function UpcomingAppointmentsSection (props: Props) {
	const { upcomingDoctorAppointments } = props
	// eslint-disable-next-line max-len
	const [filteredUpcomingDoctorAppointments, setFilteredUpcomingDoctorAppointments] = useState<DoctorDashboardData[]>(upcomingDoctorAppointments)
	const [showApproved, setShowApproved] = useState(true)
	const [showUnapproved, setShowUnapproved] = useState(true)

	useEffect(() => {
		let filteredAppointments: DoctorDashboardData[] = []

		if (showApproved) {
			filteredAppointments = filteredAppointments.concat(
				upcomingDoctorAppointments.filter((appointment) => appointment.doctorConfirmationStatus === "Approved")
			)
		}

		if (showUnapproved) {
			filteredAppointments = filteredAppointments.concat(
				upcomingDoctorAppointments.filter((appointment) => appointment.doctorConfirmationStatus === "Pending")
			)
		}

		setFilteredUpcomingDoctorAppointments(filteredAppointments)
	}, [showApproved, showUnapproved, upcomingDoctorAppointments])

	return (
		<div className="mb-3 bg-yellow-100 border border-brown-400 rounded mx-3">
			<div className="p-4 bg-amber-200 border-b border-brown-400 flex justify-between items-center">
				<h1 className="text-brown-800 font-bold">Upcoming Appointments</h1>
				<div className="flex items-center">
					<label className="mr-4">
						<input type="checkbox" checked={showApproved} onChange={() => setShowApproved(!showApproved)} />
						Approved
					</label>
					<label>
						<input type="checkbox" checked={showUnapproved} onChange={() => setShowUnapproved(!showUnapproved)} />
						Unapproved
					</label>
				</div>
			</div>
			<div className="p-4">
				<UpcomingAppointmentsMap upcomingDoctorAppointments={filteredUpcomingDoctorAppointments} />
			</div>
		</div>
	)
}
