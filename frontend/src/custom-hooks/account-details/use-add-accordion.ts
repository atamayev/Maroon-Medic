import _ from "lodash"
import { useContext } from "react"
import AppContext from "src/contexts/maroon-context"

const useAddAccordion = (): () => void => {
	const doctorAccountDetails = useContext(AppContext).privateDoctorData?.doctorAccountDetails

	const addAccordion = (): void => {
		if (_.isNil(doctorAccountDetails)) return

		let maxPriority = Math.max(...doctorAccountDetails.addressData.map(address => address.addressPriority))
		if (maxPriority === -Infinity) maxPriority = 0

		doctorAccountDetails.addressData = [...doctorAccountDetails.addressData,
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
				times: []
			}
		]
	}

	return addAccordion
}


export default useAddAccordion
