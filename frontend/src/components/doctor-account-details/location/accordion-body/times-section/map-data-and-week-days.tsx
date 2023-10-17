import _ from "lodash"
import { useContext } from "react"
import { observer } from "mobx-react"
import LocationMapData from "./map-data"
import WeekDays from "./weekdays"
import AppContext from "src/contexts/maroon-context"

interface Props {
	address: DoctorAddressData
}

function MapDataAndWeekDays (props: Props) {
	const { address } = props
	const doctorAccountDetails = useContext(AppContext).privateDoctorData?.doctorAccountDetails

	const handleTimesChange = (newTimesFn: React.SetStateAction<DoctorAvailability[]>, addressPriority: number) => {
		if (_.isNil(doctorAccountDetails)) return

		const newAddresses = doctorAccountDetails.temporaryAddressData.map(singleAddress => {
			if (singleAddress.addressPriority === addressPriority) {
				const newTimes = typeof newTimesFn === "function" ? newTimesFn(singleAddress.times) : newTimesFn
				return { ...singleAddress, times: newTimes }
			}
			return singleAddress
		})
		doctorAccountDetails.temporaryAddressData = newAddresses
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

export default observer(MapDataAndWeekDays)
