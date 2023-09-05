import FormGroup from "src/components/form-group"

interface Props {
	address: DoctorAddressData
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, addressPriority: number) => void
}

export default function CityInput ({address, handleInputChange}: Props) {
	return (
		<div className="w-full md:w-1/4 px-2 mb-3">
			<FormGroup
				className = "mb-3"
				label = "City *"
				type = "text"
				placeholder = "City"
				value = {address.city || ""}
				onChange = {(event) => handleInputChange(event, address.addressPriority)}
				name = "city"
			/>
		</div>
	)
}