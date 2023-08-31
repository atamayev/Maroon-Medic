import AddressTitleInput from "./address-title-input"
import AddressLine1Input from "./address-line-1-input"
import AddressLine2Input from "./address-line-2-input"
import CityInput from "./city-input"

interface Props {
	address: DoctorAddressData
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, addressPriority: number) => void
}

export default function FirstAccordionBodyRow (props: Props) {
	const {address, handleInputChange} = props

	return (
		<div className = "flex flex-wrap">
			<AddressTitleInput address = {address} handleInputChange = {handleInputChange} />
			<AddressLine1Input address = {address} handleInputChange = {handleInputChange} />
			<AddressLine2Input address = {address} handleInputChange = {handleInputChange} />
			<CityInput address = {address} handleInputChange = {handleInputChange} />
		</div>
	)
}
