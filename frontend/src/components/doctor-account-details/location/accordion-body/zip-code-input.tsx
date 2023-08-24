import FormGroup from "src/components/form-group"

interface Props {
  address: DoctorAddressData
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, addressPriority: number) => void
}

export const ZipCodeInput = ({address, handleInputChange}: Props) => {
	return (
		<div className = "col-md-3">
			<FormGroup
				className = "mb-3"
				label = "Zip Code *"
				type = "number"
				placeholder = "Zip Code"
				value = {address.zip || ""}
				onChange = {(event) => handleInputChange(event, address.address_priority)}
				name = "zip"
			/>
		</div>
	)
}

export default ZipCodeInput
