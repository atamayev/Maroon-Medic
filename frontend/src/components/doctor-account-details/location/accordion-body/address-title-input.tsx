import FormGroup from "src/components/form-group"

interface Props {
  address: DoctorAddressData
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, addressPriority: number) => void
}

const AddressTitleInput = ({address, handleInputChange}: Props) => {
	return (
		<div className="w-full md:w-1/4 px-2 mb-3">
			<FormGroup
				className = "mb-3"
				label = "Address Title *"
				type = "text"
				placeholder = "Address Title"
				value = {address.address_title || ""}
				onChange = {(event) => handleInputChange(event, address.address_priority)}
				name = "address_title"
			/>
		</div>
	)
}

export default AddressTitleInput
