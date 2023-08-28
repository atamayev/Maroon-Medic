import Toggle from "react-toggle"

interface Props {
  address: DoctorAddressData
  handleToggleChange: (
    addressPriority: number,
    field: keyof Pick<DoctorAddressData, "address_public_status" | "instantBook">
  ) => void
}

const PublicStatus = (props: Props) => {
	const {address, handleToggleChange} = props

	return (
		<>
			<span>Public Status:</span>
			<div onClick = {(event) => event.stopPropagation()}>
				<Toggle
					id = {`${address.address_priority}`}
					checked = {address.address_public_status}
					onChange = {() => handleToggleChange(address.address_priority, "address_public_status")}
				/>
			</div>
		</>
	)
}

export default PublicStatus
