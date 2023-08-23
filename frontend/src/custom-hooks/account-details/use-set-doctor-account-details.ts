import { useEffect } from "react"
import fetchDoctorLists from "src/helper-functions/account-details/fetch/fetch-doctor-lists"
import FetchDoctorAccountDetails from "src/helper-functions/account-details/fetch/fetch-doctor-account-details"

export default function useSetDoctorAccountDetails(
  setListDetails: React.Dispatch<React.SetStateAction<DoctorListDetails>>,
  setExpandedCategories: React.Dispatch<React.SetStateAction<string[]>>,
  dispatchers: DoctorAccountDispatchers
): void {
  const getDoctorAccountDetails: () => void = async () => {
    try {
      const storedAccountDetails = sessionStorage.getItem("DoctorAccountDetails")
      if (!storedAccountDetails) {
        await FetchDoctorAccountDetails(dispatchers)
      } else setExpandedCategories(JSON.parse(storedAccountDetails).services?.map((service: ServiceItem) => service.Category_name))

      const storedListDetails = sessionStorage.getItem("ListDetails")
      if (storedListDetails) setListDetails(JSON.parse(storedListDetails))
      else await fetchDoctorLists(setListDetails)
    } catch (error) {
    }
  }

  useEffect(() => {
    getDoctorAccountDetails()
  }, [])
}
