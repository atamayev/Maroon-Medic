import _ from "lodash"
import FormGroup from "../form-group"
import handleLocationChange from "src/helper-functions/public-doctor/booking-page/handle-location-change"

interface SelectLocationProps extends AppointmentBookingProps {
  addresses: PublicAddressData[]
  setNoAvailableTimesMessage: React.Dispatch<React.SetStateAction<boolean>>
}

const SelectLocation = (props: SelectLocationProps) => {
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
				value = {_.toString(appointmentInformation.selectedLocation?.addressesID) || ""}
			>
				<option value = "" disabled>Select...</option>
				{addresses.map((address) => (
					<option key={address.addressesID} value={address.addressesID}>
						{address.address_title}: ({address.address_line_1} {address.address_line_2}, {" "}
						{address.city}, {" "} {address.state}, {" "} {address.zip})
					</option>
				))}
			</FormGroup>
		</div>
	)
}

export default SelectLocation
