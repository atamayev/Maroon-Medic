import AccountDetailsCard from "src/components/account-details-card"
import Button from "src/components/button"

interface Props {
  verified: boolean
}

export default function VerificationSection (props: Props) {
	return (
		<AccountDetailsCard
			title = "Verification Status"
			content = {<VetVerification {...props} />}
		/>
	)
}

function VetVerification ({ verified } : { verified: boolean }) {
	if (verified) {
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
