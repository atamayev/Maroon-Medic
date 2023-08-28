interface Props {
  address: DoctorAddressData
  index: number
}

const AddressTitle = (props: Props) => {
	const {address, index} = props

	if (address.addressTitle) return <>{address.addressTitle}</>
	return <>{("Address #" + (index + 1))}</>
}

export default AddressTitle
