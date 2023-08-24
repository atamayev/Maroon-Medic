import FirstAccordionBodyRow from "./first-accordion-body-row"
import SecondAccordionBodyRow from "./second-accordion-body-row"
import MapDataAndWeekDays from "./times-section/map-data-and-week-days"

interface Props {
  isOpen: boolean
  address: DoctorAddressData
  addresses: DoctorAddressData[]
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>
}

const AccordionBody = (props: Props) => {
	const { isOpen, address, setAddresses, addresses } = props

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, addressPriority: number) => {
		const newAddresses = addresses.map(_address => {
			if (_address.address_priority === addressPriority) return { ..._address, [event.target.name]: event.target.value }
			return _address
		})
		setAddresses(newAddresses)
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
					setAddresses={setAddresses}
					addresses={addresses}
				/>
			</form>
		</div>
	)
}

export default AccordionBody
