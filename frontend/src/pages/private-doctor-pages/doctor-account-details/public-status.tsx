import { observer } from "mobx-react"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import AccountDetailsCard from "src/components/account-details-card"
import HidePublicStatus from "src/components/doctor-account-details/public-status/hide-public-status"
import ShowPublicStatus from "src/components/doctor-account-details/public-status/show-public-status"

export default function PublicStatusSection () {
	return (
		<AccountDetailsCard
			title = "Public Availbility Status"
			content = {<PublicAvailability />}
		/>
	)
}

function PublicAvailability () {
	const [publiclyAvailableConfirmation, setPubliclyAvailableConfirmation] = useConfirmationMessage()

	return (
		<div>
			<p>Would you like your profile to be available through search results?</p>
			<div className = "flex mt-1">
				<HidePublicStatus
					setPubliclyAvailableConfirmation = {setPubliclyAvailableConfirmation}
				/>

				<ShowPublicStatus
					setPubliclyAvailableConfirmation = {setPubliclyAvailableConfirmation}
				/>
			</div>
			<SavedConfirmationMessage
				confirmationMessage={publiclyAvailableConfirmation}
				whatIsBeingSaved="Public Availability Status"
			/>
		</div>
	)
}

observer(PublicStatusSection)
