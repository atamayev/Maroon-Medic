export const addAccordion = (
	addresses: DoctorAddressData[],
	setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>
): void => {
	let maxPriority = Math.max(...addresses.map(address => address.addressPriority))
	if (maxPriority === -Infinity) maxPriority = 0
	setAddresses(
		[...addresses,
			{
				addressPriority: maxPriority + 1,
				addressesId: -1,
				addressTitle: "",
				addressLine1: "",
				addressLine2: "",
				city: "",
				state: "",
				zip: "",
				country: "",
				phone: "",
				addressPublicStatus: true,
				instantBook: false,
				times:[]
			}
		]
	)
}

export default addAccordion
