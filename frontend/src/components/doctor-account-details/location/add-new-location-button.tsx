import Button from "src/components/button"
import addAccordion from "src/helper-functions/account-details/add/add-accordion"

interface Props {
  addresses: DoctorAddressData[]
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>
}

const AddNewLocationButton = (props: Props) => {
	const { addresses, setAddresses } = props

	return (
		<Button
			className = "mr-3"
			colorClass = "bg-green-600"
			hoverClass = "hover:bg-green-700"
			title = "Add New Location"
			onClick = {() => addAccordion(addresses, setAddresses)}
		/>
	)
}

export default AddNewLocationButton
