import FormGroup from "src/components/form-group"

interface Props {
	address: DoctorAddressData
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, addressPriority: number) => void
}

export default function AddressLine1Input ({address, handleInputChange}: Props) {
	return (
		<div className="w-full md:w-1/4 px-2 mb-3">
			<FormGroup
				className = "mb-3"
				label = "Address line 1 *"
				type = "text"
				placeholder = "Address line 1"
				value = {address.addressLine1 || ""}
				onChange = {(event) => handleInputChange(event, address.addressPriority)}
				name = "addressLine1"
			/>
		</div>
	)
}
