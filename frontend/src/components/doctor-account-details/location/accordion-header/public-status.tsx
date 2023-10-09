import Toggle from "react-toggle"

interface Props {
	address: DoctorAddressData
	handleToggleChange: (
		addressPriority: number,
		field: keyof Pick<DoctorAddressData, "addressPublicStatus" | "instantBook">
	) => void
}

export default function PublicStatus (props: Props) {
	const { address, handleToggleChange } = props

	return (
		<>
			<span>Public Status:</span>
			<div onClick = {(event) => event.stopPropagation()}>
				<Toggle
					id = {`${address.addressPriority}`}
					checked = {address.addressPublicStatus}
					onChange = {() => handleToggleChange(address.addressPriority, "addressPublicStatus")}
				/>
			</div>
		</>
	)
}
