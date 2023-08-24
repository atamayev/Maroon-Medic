import FormGroup from "src/components/form-group"

interface Props {
  address: DoctorAddressData
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, addressPriority: number) => void
}

export const CountryInput = ({address, handleInputChange}: Props) => {
	return (
		<div className="w-full md:w-1/4 px-2 mb-3">
			<FormGroup
				className = "mb-3"
				label = "Country *"
				type = "text"
				placeholder = "Country"
				value = {address.country || ""}
				onChange = {(event) => handleInputChange(event, address.address_priority)}
				name = "country"
			/>
		</div>
	)
}

export default CountryInput
