import AccountDetailsCard from "src/components/account-details-card"
import UnverifiedVet from "src/components/doctor-account-details/verificiation-status/unverified"
import VerifiedVet from "src/components/doctor-account-details/verificiation-status/verified"

export default function VerificationSection () {
	return (
		<AccountDetailsCard
			title = "Verification Status"
			content = {<VetVerification />}
		/>
	)
}

function VetVerification () {
	return (
		<>
			Account Verification Status:
			<VerifiedVet />
			<UnverifiedVet />
		</>
	)
}
