import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import updatePublicAvailability from "../../../helper-functions/account-details/save/doctor-account-details/update-public-availability"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import AccountDetailsCard from "src/components/account-details-card"

interface Props {
  publiclyAvailable: boolean
  setPubliclyAvailable: React.Dispatch<React.SetStateAction<boolean>>
}

export default function PublicStatusSection (props: Props) {
	return (
		<AccountDetailsCard
			title = "Public Availbility Status"
			content = {<PublicAvailability {...props} />}
		/>
	)
}

function PublicAvailability (props: Props) {
	const { publiclyAvailable, setPubliclyAvailable } = props
	const [publiclyAvailableConfirmation, setPubliclyAvailableConfirmation] = useConfirmationMessage()

	return (
		<div>
			<p>Would you like your profile to be available through search results?</p>
			{/* All of this logic must be kept in this component, or else the toggle button will not work: */}
			<div className = "flex mt-1">
				<button
					value = {0}
					onClick = {() =>
						updatePublicAvailability(false, publiclyAvailable, setPubliclyAvailable, setPubliclyAvailableConfirmation)
					}
					className = {`border-red-400 border p-2 mr-2 rounded w-14 transition-all duration-100
						${!publiclyAvailable ? "bg-red-600 text-white" : "bg-white text-black hover:bg-red-300"}
					`}
				>
					No
				</button>

				<button
					value = {1}
					onClick = {() =>
						updatePublicAvailability(true, publiclyAvailable, setPubliclyAvailable, setPubliclyAvailableConfirmation)
					}
					className = {`border-green-500 border p-2 rounded w-14 transition-all duration-100
						${publiclyAvailable ? "bg-green-700 text-white" : "bg-white text-black hover:bg-green-400"}
					`}
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
