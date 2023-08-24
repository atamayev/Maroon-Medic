import FormGroup from "src/components/form-group"

interface Props {
  address: DoctorAddressData
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, addressPriority: number) => void
}

const AddressLine2Input = ({address, handleInputChange}: Props) => {
	return (
		<div className="w-full md:w-1/4 px-2 mb-3">
			<FormGroup
				className = "mb-3"
				label = "Address line 2"
				type = "text"
				placeholder = "Address line 2"
				value = {address.address_line_2 || ""}
				onChange = {(event) => handleInputChange(event, address.address_priority)}
				name = "address_line_2"
			/>
		</div>
	)
}

export default AddressLine2Input
