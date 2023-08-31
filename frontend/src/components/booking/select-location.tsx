import _ from "lodash"
import FormGroup from "../form-group"
import handleLocationChange from "src/helper-functions/public-doctor/booking-page/handle-location-change"

interface SelectLocationProps extends AppointmentBookingProps {
	addresses: PublicAddressData[]
	setNoAvailableTimesMessage: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SelectLocation (props: SelectLocationProps) {
	const { addresses, appointmentInformation, setAppointmentInformation, setNoAvailableTimesMessage } = props

	if (!appointmentInformation.selectedService) return null

	return (
		<div className="col-md-6">
			<FormGroup
				as="select"
				id="locationSelect"
				label="Select a location"
				onChange={(e) =>
					handleLocationChange(
						e,
						addresses,
						setAppointmentInformation,
						setNoAvailableTimesMessage
					)}
				value = {_.toString(appointmentInformation.selectedLocation?.addressesId) || ""}
			>
				<option value = "" disabled>Select...</option>
				{addresses.map((address) => (
					<option key={address.addressesId} value={address.addressesId}>
						{address.addressTitle}: ({address.addressLine1} {address.addressLine2}, {" "}
						{address.city}, {" "} {address.state}, {" "} {address.zip})
					</option>
				))}
			</FormGroup>
		</div>
	)
}
