import _ from "lodash"
import { AppContext } from "src/contexts/maroon-context"
import { useContext, useEffect } from "react"
import useFetchDoctorLists from "src/custom-hooks/account-details/fetch/use-fetch-doctor-lists"
import useFetchDoctorAccountDetails from "src/custom-hooks/account-details/fetch/use-fetch-doctor-account-details"

export default function useSetDoctorAccountDetails(
	setExpandedCategories: React.Dispatch<React.SetStateAction<string[]>>,
): void {
	const appContext = useContext(AppContext)
	const fetchDoctorAccountDetails = useFetchDoctorAccountDetails()
	const fetchDoctorLists = useFetchDoctorLists()

	const getDoctorAccountDetails: () => void = async () => {
		try {
			if (_.isNull(appContext.doctorAccountDetails)) {
				console.log("here")
				await fetchDoctorAccountDetails()
			} else {
				setExpandedCategories(
					appContext.doctorAccountDetails.services.map((service: ServiceItemNotNullablePrice) => service.categoryName)
				)
			}

			if (_.isNull(appContext.doctorLists)) {
				await fetchDoctorLists()
			}
		} catch (error) {
		}
	}

	useEffect(() => {
		console.log(appContext.userType)
		if (appContext.userType !== "Doctor") return
		getDoctorAccountDetails()
	}, [appContext.userType])
}
