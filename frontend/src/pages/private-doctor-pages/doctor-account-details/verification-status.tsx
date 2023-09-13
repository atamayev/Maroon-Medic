import _ from "lodash"
import { useContext } from "react"
import AccountDetailsCard from "src/components/account-details-card"
import Button from "src/components/button"
import { AppContext } from "src/contexts/maroon-context"

export default function VerificationSection () {
	return (
		<AccountDetailsCard
			title = "Verification Status"
			content = {<VetVerification />}
		/>
	)
}

function VetVerification () {
	const { doctorAccountDetails } = useContext(AppContext)

	if (_.isNull(doctorAccountDetails)) return null

	if (doctorAccountDetails.verified) {
		return (
			<>
				Account Verification Status:
				<Button
					colorClass = "bg-green-500"
					hoverClass = "hover:bg-green-500"
					title = "✓ (Your identity is Verified)"
					disabled
				/>
			</>
		)
	}
	return (
		<>
			Account Verification Status:
			<Button
				colorClass = "bg-red-500"
				hoverClass = "hover:bg-red-600"
				title = "X (Your identity is Not Verified)"
			/>
		</>
	)
}
