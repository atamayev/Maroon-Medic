import PillItem from "src/components/account-nav-item"

export default function PatientHeader() {
	return (
		<div className="flex space-x-4 p-4">
			<PillItem label = "Dashboard" to = "/dashboard" image = "🏠" />
			<PillItem label = "My Pets" to = "/my-pets" image = "😸" imageAlt = "🐶"/>
			<PillItem label = "Account Details" to = "/account-details" image = "🗂️"/>
			<PillItem label = "Settings" to = "/settings" image = "⚙️"/>
		</div>
	)
}
