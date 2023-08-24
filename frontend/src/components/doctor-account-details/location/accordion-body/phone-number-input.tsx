import FormGroup from "src/components/form-group"

interface Props {
  address: DoctorAddressData
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, addressPriority: number) => void
}

export const PhoneNumberInput = ({address, handleInputChange}: Props) => {
	return (
		<div className = "col-md-3">
			<FormGroup
				className = "mb-3"
				label = "Phone Number"
				type = "number"
				placeholder = "Phone Number"
				value = {address.Phone}
				onChange = {(event) => handleInputChange(event, address.address_priority)}
				name = "phone"
			/>
		</div>
	)
}

export default PhoneNumberInput
