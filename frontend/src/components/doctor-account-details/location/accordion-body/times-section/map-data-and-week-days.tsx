import { useContext } from "react"
import LocationMapData from "./map-data"
import WeekDays from "./weekdays"
import { AppContext } from "src/contexts/maroon-context"

interface Props {
	address: DoctorAddressData
}

export default function MapDataAndWeekDays (props: Props) {
	const { address } = props
	const { doctorAccountDetails } = useContext(AppContext)

	const handleTimesChange = (newTimesFn: React.SetStateAction<DoctorAvailability[]>, addressPriority: number) => {
		const newAddresses = doctorAccountDetails!.addressData.map(singleAddress => {
			if (singleAddress.addressPriority === addressPriority) {
				const newTimes = typeof newTimesFn === "function" ? newTimesFn(singleAddress.times) : newTimesFn
				return { ...singleAddress, times: newTimes }
			}
			return singleAddress
		})
		doctorAccountDetails!.addressData = newAddresses
	}

	return (
		<div className = "flex flex-wrap">
			<LocationMapData />
			<WeekDays
				times = {address.times}
				setTimes = {newTimes => handleTimesChange(newTimes, address.addressPriority)}
			/>
		</div>
	)
}
