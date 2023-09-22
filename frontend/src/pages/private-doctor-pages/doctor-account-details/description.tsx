import AccountDetailsCard from "src/components/account-details-card"
import DescriptionContent from "../../../components/doctor-account-details/description/description-content"

export default function DescriptionSection() {
	//The Description content must be in a seperate file or else the observer doesn't work properly
	// The description doesn't render when first navigating to the page.
	return (
		<AccountDetailsCard
			title = "Description"
			content = {<DescriptionContent />}
		/>
	)
}
