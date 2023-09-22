import _ from "lodash"
import { useContext } from "react"
import { observer } from "mobx-react"
import Button from "../../button"
import { AppContext } from "src/contexts/maroon-context"

function VerifiedVet() {
	const { doctorAccountDetails } = useContext(AppContext)

	if (_.isNull(doctorAccountDetails) || !doctorAccountDetails.verified) return null

	return (
		<Button
			colorClass = "bg-green-500"
			hoverClass = "hover:bg-green-500"
			title = "✓ (Your identity is Verified)"
			disabled
		/>
	)
}

export default observer(VerifiedVet)
