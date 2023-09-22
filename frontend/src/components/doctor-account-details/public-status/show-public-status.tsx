import _ from "lodash"
import { observer } from "mobx-react"
import { useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"
import useUpdatePublicAvailability from "src/custom-hooks/account-details/save/doctor-account-details/use-update-public-availability"

interface Props {
	setPubliclyAvailableConfirmation: (conf: ConfirmationMessage) => void
}

function ShowPublicStatus (props: Props) {
	const { setPubliclyAvailableConfirmation } = props
	const { doctorAccountDetails } = useContext(AppContext)
	const updatePublicAvailability = useUpdatePublicAvailability()

	if (_.isNull(doctorAccountDetails)) return null

	return (
		<button
			value = {1}
			onClick = {() =>
				updatePublicAvailability(true, doctorAccountDetails.publiclyAvailable, setPubliclyAvailableConfirmation)
			}
			className = {
				`border-green-500 border p-2 rounded w-14 transition-all duration-100
				${doctorAccountDetails.publiclyAvailable ? "bg-green-700 text-white" : "bg-white text-black hover:bg-green-400"}`
			}
		>
			Yes
		</button>
	)
}

export default observer(ShowPublicStatus)
