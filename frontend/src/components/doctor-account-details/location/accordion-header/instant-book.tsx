import Toggle from "react-toggle"

interface Props {
	address: DoctorAddressData
	handleToggleChange: (
	addressPriority: number,
	field: keyof Pick<DoctorAddressData, "addressPublicStatus" | "instantBook">
	) => void
}

export default function InstantBook (props: Props) {
	const {address, handleToggleChange} = props

	return (
		<>
			<span>Instant book:</span>
			<div onClick = {(event) => event.stopPropagation()}>
				<Toggle
					id = {`${address.addressPriority}`}
					checked = {address.instantBook}
					onChange = {() => handleToggleChange(address.addressPriority, "instantBook")}
				/>
			</div>
		</>
	)
}
