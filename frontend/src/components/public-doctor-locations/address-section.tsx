const AddressSection = ({ address }: {address: PublicAddressData}) => {
	return (
		<>
			<h4>{address.address_title}</h4>
			<p>{address.address_line_1}</p>
			<p>{address.address_line_2}</p>
			<p>{address.city}, {address.state} {address.zip}, {address.country}</p>
		</>
	)
}

export default AddressSection
