import _ from "lodash"
import { useContext } from "react"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import useUpdatePublicAvailability from "src/custom-hooks/account-details/save/doctor-account-details/use-update-public-availability"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import AccountDetailsCard from "src/components/account-details-card"
import { AppContext } from "src/contexts/maroon-context"
import { observer } from "mobx-react"

export default function PublicStatusSection () {
	return (
		<AccountDetailsCard
			title = "Public Availbility Status"
			content = {<PublicAvailability />}
		/>
	)
}

function PublicAvailability () {
	const { doctorAccountDetails } = useContext(AppContext)
	const [publiclyAvailableConfirmation, setPubliclyAvailableConfirmation] = useConfirmationMessage()

	if (_.isNull(doctorAccountDetails)) return null

	return (
		<div>
			<p>Would you like your profile to be available through search results?</p>
			{/* All of this logic must be kept in this component, or else the toggle button will not work: */}
			<div className = "flex mt-1">
				<button
					value = {0}
					onClick = {() =>
						useUpdatePublicAvailability(false, doctorAccountDetails.publiclyAvailable, setPubliclyAvailableConfirmation)
					}
					className = {`border-red-400 border p-2 mr-2 rounded w-14 transition-all duration-100
						${!doctorAccountDetails.publiclyAvailable ? "bg-red-600 text-white" : "bg-white text-black hover:bg-red-300"}
					`}
				>
					No
				</button>

				<button
					value = {1}
					onClick = {() =>
						useUpdatePublicAvailability(true, doctorAccountDetails.publiclyAvailable, setPubliclyAvailableConfirmation)
					}
					className = {
						`border-green-500 border p-2 rounded w-14 transition-all duration-100
						${doctorAccountDetails.publiclyAvailable ? "bg-green-700 text-white" : "bg-white text-black hover:bg-green-400"}`
					}
				>
					Yes
				</button>
			</div>
			<SavedConfirmationMessage
				confirmationMessage={publiclyAvailableConfirmation}
				whatIsBeingSaved="Public Availability Status"
			/>
		</div>
	)
}

observer(PublicStatusSection)
