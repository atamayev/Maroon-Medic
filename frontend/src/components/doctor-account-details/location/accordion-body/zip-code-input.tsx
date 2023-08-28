import FormGroup from "src/components/form-group"

interface Props {
  address: DoctorAddressData
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, addressPriority: number) => void
}

export const ZipCodeInput = ({address, handleInputChange}: Props) => {
	return (
		<div className="w-full md:w-1/4 px-2 mb-3">
			<FormGroup
				className = "mb-3"
				label = "Zip Code *"
				type = "number"
				placeholder = "Zip Code"
				value = {address.zip || ""}
				onChange = {(event) => handleInputChange(event, address.addressPriority)}
				name = "zip"
			/>
		</div>
	)
}

export default ZipCodeInput
