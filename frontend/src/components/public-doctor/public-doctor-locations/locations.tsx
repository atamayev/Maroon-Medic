import _ from "lodash"
import { observer } from "mobx-react"
import useRetrieveDoctorIDFromParams from "src/custom-hooks/public-doctor/use-retrieve-doctor-id-from-params"
import useRetrieveSinglePublicDoctorData from "src/custom-hooks/public-doctor/use-retrieve-single-public-doctor-data"
import AddressSection from "./address-section"
import TimesSection from "./times-section"

function Locations() {
	const doctorID = useRetrieveDoctorIDFromParams()
	const doctorData = useRetrieveSinglePublicDoctorData(doctorID)

	function InstantBook ({ address }: {address: PublicAddressData}) {
		if (address.instantBook) return <>Instant book available</>
		return <>Instant book unavailable</>
	}

	function PhoneSection ({ address }: {address: PublicAddressData}) {
		if (!address.phone) return null
		return <p>Phone: {address.phone}</p>
	}

	if (_.isNull(doctorData)) return null

	return (
		<>
			{doctorData.doctorAddressData.map((address: PublicAddressData) => (
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

export default observer(Locations)
