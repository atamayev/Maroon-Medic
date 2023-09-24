import _ from "lodash"
import { observer } from "mobx-react"
import { useContext } from "react"
import AppContext from "src/contexts/maroon-context"
import useUpdatePublicAvailability from "src/custom-hooks/account-details/save/doctor-account-details/use-update-public-availability"

interface Props {
	setPubliclyAvailableConfirmation: (conf: ConfirmationMessage) => void
}

function HidePublicStatus (props: Props) {
	const { setPubliclyAvailableConfirmation } = props
	const doctorAccountDetails = useContext(AppContext).privateDoctorData?.doctorAccountDetails

	const updatePublicAvailability = useUpdatePublicAvailability()
	if (_.isNil(doctorAccountDetails)) return null

	return (
		<button
			value = {0}
			onClick = {() =>
				updatePublicAvailability(false, doctorAccountDetails.publiclyAvailable, setPubliclyAvailableConfirmation)
			}
			className = {`border-red-400 border p-2 mr-2 rounded w-14 transition-all duration-100
				${!doctorAccountDetails.publiclyAvailable ? "bg-red-600 text-white" : "bg-white text-black hover:bg-red-300"}
			`}
		>
			No
		</button>
	)
}

export default observer(HidePublicStatus)
