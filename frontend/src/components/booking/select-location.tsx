import FormGroup from "../form-group"
import { handleLocationChange } from "src/custom-hooks/public-doctor-hooks/booking-page-hooks"

interface SelectLocationProps {
  addresses: PublicAddressData[]
  selectedService: ServiceItem | null
  setNoAvailableTimesMessage: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedLocation: React.Dispatch<React.SetStateAction<PublicAddressData | null>>
  setSelectedDay: React.Dispatch<React.SetStateAction<string | null>>
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>
}

const SelectLocation = (props: SelectLocationProps) => {
  const { addresses, selectedService, setNoAvailableTimesMessage,
    setSelectedLocation, setSelectedDay, setSelectedTime } = props

  if (!selectedService) return null

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
            setSelectedLocation,
            setSelectedDay,
            setSelectedTime,
            setNoAvailableTimesMessage
          )}
      >
        <option>Select...</option>
        {addresses.map((address) => (
          <option key={address.addressesID} value={address.addressesID}>
            {address.address_title}: ({address.address_line_1} {address.address_line_2}, {address.city}, {address.state}, {address.zip})
          </option>
        ))}
      </FormGroup>
    </div>
  )
}

export default SelectLocation
