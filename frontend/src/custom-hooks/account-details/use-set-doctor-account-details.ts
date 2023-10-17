import _ from "lodash"
import AppContext from "src/contexts/maroon-context"
import { useContext, useEffect } from "react"
import useFetchDoctorLists from "src/custom-hooks/account-details/fetch/use-fetch-doctor-lists"
import useFetchDoctorAccountDetails from "src/custom-hooks/account-details/fetch/use-fetch-doctor-account-details"

export default function useSetDoctorAccountDetails(
	setExpandedCategories: React.Dispatch<React.SetStateAction<string[]>>,
	setExpandedPetTypes: React.Dispatch<React.SetStateAction<string[]>>
): void {
	const appContext = useContext(AppContext)
	const fetchDoctorAccountDetails = useFetchDoctorAccountDetails()
	const fetchDoctorLists = useFetchDoctorLists()

	const getDoctorAccountDetails: () => void = async () => {
		try {
			if (_.isNull(appContext.privateDoctorData) || (_.isNull(appContext.privateDoctorData.doctorAccountDetails))) return

			if (_.isNull(appContext.privateDoctorData.doctorAccountDetails)) {
				await fetchDoctorAccountDetails()
			}
			setExpandedCategories(
				appContext.privateDoctorData.doctorAccountDetails.services.map(
					(service: ServiceItemNotNullablePrice) => service.categoryName
				)
			)
			setExpandedPetTypes(
				appContext.privateDoctorData.doctorAccountDetails.servicedPets.map((servicedPet: ServicedPetItem) => servicedPet.petType)
			)

			if (_.isNull(appContext.privateDoctorData.doctorLists)) {
				await fetchDoctorLists()
			}
		} catch (error) {
		}
	}

	useEffect(() => {
		if (appContext.auth.userType !== "Doctor") return
		getDoctorAccountDetails()
	}, [appContext.auth.userType])
}
