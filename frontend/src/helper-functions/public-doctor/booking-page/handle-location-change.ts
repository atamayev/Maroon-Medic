import _ from "lodash"

const handleLocationChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  addresses: PublicAddressData[],
  setSelectedLocation: React.Dispatch<React.SetStateAction<PublicAddressData | null>>,
  setSelectedDay: React.Dispatch<React.SetStateAction<string | null>>,
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>,
  setNoAvailableTimesMessage: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  const value = event.target.value
  const selectedLocationObject = addresses.find(location => location.addressesID.toString() === value)

  if (value === "Select...") {
    setSelectedLocation(null)
    setNoAvailableTimesMessage(false)
    setSelectedDay(null)
    setSelectedTime(null)
  } else if (_.isEmpty(selectedLocationObject?.times)) {
    setNoAvailableTimesMessage(true)
    setSelectedLocation(null)
    setSelectedTime(null)
  } else {
    setNoAvailableTimesMessage(false)
    setSelectedLocation(selectedLocationObject!)
  }
}

export default handleLocationChange
