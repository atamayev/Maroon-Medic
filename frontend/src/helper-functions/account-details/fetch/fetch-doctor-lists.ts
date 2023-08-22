import ListsDataService from "src/services/lists-data-service"
import { handle401AxiosError } from "src/utils/handle-errors"

export default async function fetchDoctorLists(setListDetails: React.Dispatch<React.SetStateAction<DoctorListDetails>>): Promise<void> {
  try {
    const response = await ListsDataService.fillDoctorLists()
    setListDetails(response.data)
    sessionStorage.setItem("ListDetails", JSON.stringify(response.data))
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}

