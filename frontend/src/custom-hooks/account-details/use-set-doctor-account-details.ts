import _ from "lodash"
import { AppContext } from "src/contexts/maroon-context"
import { useContext, useEffect } from "react"
import fetchDoctorLists from "src/custom-hooks/account-details/fetch/use-fetch-doctor-lists"
import fetchDoctorAccountDetails from "src/custom-hooks/account-details/fetch/use-fetch-doctor-account-details"

export default function useSetDoctorAccountDetails(
	setListDetails: React.Dispatch<React.SetStateAction<DoctorListDetails>>,
	setExpandedCategories: React.Dispatch<React.SetStateAction<string[]>>,
	dispatchers: DoctorAccountDispatchers
): void {
	const appContext = useContext(AppContext)
	const getDoctorAccountDetails: () => void = async () => {
		try {
			if (_.isNull(appContext.doctorAccountDetails)) {
				await fetchDoctorAccountDetails(dispatchers)
			} else {
				setExpandedCategories(
					appContext.doctorAccountDetails.services.map((service: ServiceItemNotNullablePrice) => service.categoryName)
				)
			}

			if (_.isNull(appContext.doctorLists)) {
				await fetchDoctorLists(setListDetails)
			} else setListDetails(appContext.doctorLists)
		} catch (error) {
		}
	}

	useEffect(() => {
		getDoctorAccountDetails()
	}, [])
}
