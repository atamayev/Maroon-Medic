import Button from "src/components/button"
import addAccordion from "src/helper-functions/account-details/add/add-accordion"

interface Props {
  addresses: DoctorAddressData[]
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>
}

export default function AddNewLocationButton (props: Props) {
	const { addresses, setAddresses } = props

	return (
		<Button
			className = "mr-3"
			colorClass = "bg-green-700"
			hoverClass = "hover:bg-green-800"
			title = "Add New Location"
			onClick = {() => addAccordion(addresses, setAddresses)}
			textColor = "text-white"
		/>
	)
}
