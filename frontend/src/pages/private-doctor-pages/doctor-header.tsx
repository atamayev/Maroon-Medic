import PillItem from "src/components/account-nav-item"

export default function DoctorHeader() {
	return (
		<div className = "flex space-x-4 p-4">
			<PillItem label = "Dashboard" to = "/dashboard" />
			<PillItem label = "Calendar" to = "/calendar" />
			<PillItem label = "Account Details" to = "/account-details" />
			<PillItem label = "Settings" to = "/settings" />
		</div>
	)
}
