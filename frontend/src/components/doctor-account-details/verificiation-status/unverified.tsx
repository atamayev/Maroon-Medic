import _ from "lodash"
import { useContext } from "react"
import { observer } from "mobx-react"
import Button from "../../button"
import { AppContext } from "src/contexts/maroon-context"

function UnverifiedVet() {
	const { doctorAccountDetails } = useContext(AppContext)

	if (_.isNull(doctorAccountDetails) || doctorAccountDetails.verified) return null

	return (
		<Button
			colorClass = "bg-red-500"
			hoverClass = "hover:bg-red-600"
			title = "X (Your identity is Not Verified)"
		/>
	)
}

export default observer(UnverifiedVet)
