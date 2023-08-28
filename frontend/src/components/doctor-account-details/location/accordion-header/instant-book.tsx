import Toggle from "react-toggle"

interface Props {
  address: DoctorAddressData
  handleToggleChange: (
    addressPriority: number,
    field: keyof Pick<DoctorAddressData, "address_public_status" | "instantBook">
  ) => void
}

const InstantBook = (props: Props) => {
	const {address, handleToggleChange} = props

	return (
		<>
			<span>Instant book:</span>
			<div onClick = {(event) => event.stopPropagation()}>
				<Toggle
					id = {`${address.address_priority}`}
					checked = {address.instantBook}
					onChange = {() => handleToggleChange(address.address_priority, "instantBook")}
				/>
			</div>
		</>
	)
}

export default InstantBook
