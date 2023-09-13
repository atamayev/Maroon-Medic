import { AppContext } from "src/contexts/maroon-context"
import FirstAccordionBodyRow from "./first-accordion-body-row"
import SecondAccordionBodyRow from "./second-accordion-body-row"
import MapDataAndWeekDays from "./times-section/map-data-and-week-days"
import { useContext } from "react"

interface Props {
	isOpen: boolean
	address: DoctorAddressData
}

export default function AccordionBody (props: Props) {
	const { isOpen, address } = props
	const { doctorAccountDetails } = useContext(AppContext)

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, addressPriority: number) => {
		const newAddresses = doctorAccountDetails!.addressData.map(addressItem => {
			if (addressItem.addressPriority === addressPriority) return { ...addressItem, [event.target.name]: event.target.value }
			return addressItem
		})
		doctorAccountDetails!.addressData = newAddresses
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
