export const addAccordion = (
	addresses: DoctorAddressData[],
	setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>
): void => {
	let maxPriority = Math.max(...addresses.map(address => address.address_priority))
	if (maxPriority === -Infinity) maxPriority = 0
	setAddresses(
		[...addresses,
			{
				address_priority: maxPriority + 1,
				addressesID: -1,
				address_title: "",
				address_line_1: "",
				address_line_2: "",
				city: "",
				state: "",
				zip: "",
				country: "",
				Phone: "",
				address_public_status: true,
				instant_book: false,
				times:[]
			}
		]
	)
}

export default addAccordion
