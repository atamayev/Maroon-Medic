import FormGroup from "src/components/form-group"

interface Props {
  address: DoctorAddressData
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, addressPriority: number) => void
}

const CityInput = ({address, handleInputChange}: Props) => {
	return (
		<div className = "col-md-3">
			<FormGroup
				className = "mb-3"
				label = "City *"
				type = "text"
				placeholder = "City"
				value = {address.city || ""}
				onChange = {(event) => handleInputChange(event, address.address_priority)}
				name = "city"
			/>
		</div>
	)
}

export default CityInput
