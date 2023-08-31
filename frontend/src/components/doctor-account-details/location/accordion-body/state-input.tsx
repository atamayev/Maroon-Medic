import FormGroup from "src/components/form-group"

interface Props {
	address: DoctorAddressData
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, addressPriority: number) => void
}

export default function StateInput ({address, handleInputChange}: Props) {
	return (
		<div className="w-full md:w-1/4 px-2 mb-3">
			<FormGroup
				className = "mb-3"
				label = "State *"
				type = "text"
				placeholder = "State"
				value = {address.state || ""}
				onChange = {(event) => handleInputChange(event, address.addressPriority)}
				name = "state"
			/>
		</div>
	)
}
