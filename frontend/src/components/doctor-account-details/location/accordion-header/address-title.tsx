interface Props {
	address: DoctorAddressData
	index: number
}

export default function AddressTitle (props: Props) {
	const {address, index} = props

	if (address.addressTitle) return <>{address.addressTitle}</>
	return <>{("Address #" + (index + 1))}</>
}
