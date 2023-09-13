import { useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"

export const useAddAccordion = (): void => {
	const { doctorAccountDetails } = useContext(AppContext)
	let maxPriority = Math.max(...doctorAccountDetails!.addressData.map(address => address.addressPriority))
	if (maxPriority === -Infinity) maxPriority = 0

	doctorAccountDetails!.addressData = [...doctorAccountDetails!.addressData,
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
}

export default useAddAccordion
