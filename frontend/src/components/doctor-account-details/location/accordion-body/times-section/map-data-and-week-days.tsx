import LocationMapData from "./map-data"
import WeekDays from "./weekdays"

interface Props {
  address: DoctorAddressData
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>
  addresses: DoctorAddressData[]
}

const MapDataAndWeekDays = (props: Props) => {
	const { address, setAddresses, addresses } = props

	const handleTimesChange = (newTimesFn: React.SetStateAction<DoctorAvailability[]>, addressPriority: number) => {
		const newAddresses = addresses.map(singleAddress => {
			if (singleAddress.address_priority === addressPriority) {
				const newTimes = typeof newTimesFn === "function" ? newTimesFn(singleAddress.times) : newTimesFn
				return { ...singleAddress, times: newTimes }
			}
			return singleAddress
		})
		setAddresses(newAddresses)
	}

	return (
		<div className = "row">
			<LocationMapData />
			<div className = "col-md-6">
				<WeekDays
					times = {address.times}
					setTimes = {newTimes => handleTimesChange(newTimes, address.address_priority)}
				/>
			</div>
		</div>
	)
}

export default MapDataAndWeekDays
