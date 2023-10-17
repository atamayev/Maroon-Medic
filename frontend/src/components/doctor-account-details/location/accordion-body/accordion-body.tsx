import _ from "lodash"
import { useContext } from "react"
import { observer } from "mobx-react"
import AppContext from "src/contexts/maroon-context"
import FirstAccordionBodyRow from "./first-accordion-body-row"
import SecondAccordionBodyRow from "./second-accordion-body-row"
import MapDataAndWeekDays from "./times-section/map-data-and-week-days"

interface Props {
	isOpen: boolean
	address: DoctorAddressData
}

function AccordionBody (props: Props) {
	const { isOpen, address } = props
	const doctorAccountDetails = useContext(AppContext).privateDoctorData?.doctorAccountDetails

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, addressPriority: number) => {
		if (_.isNil(doctorAccountDetails)) return

		const newAddresses = doctorAccountDetails.temporaryAddressData.map(addressItem => {
			if (addressItem.addressPriority === addressPriority) return { ...addressItem, [event.target.name]: event.target.value }
			return addressItem
		})
		doctorAccountDetails.temporaryAddressData = newAddresses
	}

	return (
		<div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"} overflow-hidden`}>
			<form className="p-4">
				<FirstAccordionBodyRow
					address={address}
					handleInputChange={handleInputChange}
				/>
				<SecondAccordionBodyRow
					address={address}
					handleInputChange={handleInputChange}
				/>
				<MapDataAndWeekDays
					address={address}
				/>
			</form>
		</div>
	)
}

export default observer(AccordionBody)
