import FormGroup from "src/components/form-group"

interface Props {
  address: DoctorAddressData
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, addressPriority: number) => void
}

const AddressLine1Input = ({address, handleInputChange}: Props) => {
	return (
		<div className = "col-md-3">
			<FormGroup
				className = "mb-3"
				label = "Address line 1 *"
				type = "text"
				placeholder = "Address line 1"
				value = {address.address_line_1 || ""}
				onChange = {(event) => handleInputChange(event, address.address_priority)}
				name = "address_line_1"
			/>
		</div>
	)
}

export default AddressLine1Input
