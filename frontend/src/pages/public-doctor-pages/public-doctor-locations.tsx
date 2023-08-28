import _ from "lodash"
import PublicDoctorCard from "src/components/public-doctor-card"
import AddressSection from "src/components/public-doctor-locations/address-section"
import TimesSection from "src/components/public-doctor-locations/times-section"

export default function LocationsSection( { addresses } : {addresses: PublicAddressData[]}) {
	if (_.isEmpty(addresses)) return null
	return (
		<PublicDoctorCard
			title = "Locations"
			content = {<Locations addressesList = {addresses} />}
		/>
	)
}

function Locations({ addressesList }: { addressesList: PublicAddressData[] }) {
	const InstantBook = ({ address }: {address: PublicAddressData}) => {
		if (address.instantBook) return <>Instant book available</>
		return <>Instant book unavailable</>
	}

	const PhoneSection = ({ address }: {address: PublicAddressData}) => {
		if (!address.phone) return null
		return <p>Phone: {address.phone}</p>
	}

	return (
		<>
			{addressesList.map((address: PublicAddressData) => (
				<div key = {address.addressesId}>
					<div className = "row">
						<div className = "col-md-6">
							<AddressSection address = {address} />
							<InstantBook address = {address} />
							<PhoneSection address = {address} />
						</div>
						<TimesSection address = {address} />
					</div>
				</div>
			))}
		</>
	)
}
