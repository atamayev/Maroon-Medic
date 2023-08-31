import StateInput from "./state-input"
import ZipCodeInput from "./zip-code-input"
import CountryInput from "./country-input"
import PhoneNumberInput from "./phone-number-input"

interface Props {
	address: DoctorAddressData
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, addressPriority: number) => void
}

export default function SecondAccordionBodyRow (props: Props) {
	const {address, handleInputChange} = props

	return (
		<div className = "flex flex-wrap">
			<StateInput address = {address} handleInputChange = {handleInputChange} />
			<ZipCodeInput address = {address} handleInputChange = {handleInputChange} />
			<CountryInput address = {address} handleInputChange = {handleInputChange} />
			<PhoneNumberInput address = {address} handleInputChange = {handleInputChange} />
		</div>
	)
}
