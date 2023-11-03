export default function AddressSection ({ address }: {address: PublicAddressData}) {
	return (
		<>
			<h4>{address.addressTitle}</h4>
			<p>{address.addressLine1}</p>
			<p>{address.addressLine2}</p>
			<p>{address.city}, {address.state} {address.zip}, {address.country}</p>
		</>
	)
}
