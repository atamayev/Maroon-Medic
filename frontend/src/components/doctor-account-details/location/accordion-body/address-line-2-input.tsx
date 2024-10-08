import FormGroup from "src/components/form-group"

interface Props {
	address: DoctorAddressData
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, addressPriority: number) => void
}

export default function AddressLine2Input ({address, handleInputChange}: Props) {
	return (
		<div className="w-full md:w-1/4 px-2 mb-3">
			<FormGroup
				className = "mb-3"
				label = "Address line 2"
				type = "text"
				placeholder = "Address line 2"
				value = {address.addressLine2 || ""}
				onChange = {(event) => handleInputChange(event, address.addressPriority)}
				name = "addressLine2"
			/>
		</div>
	)
}
