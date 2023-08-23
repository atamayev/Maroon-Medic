import ListsDataService from "src/services/lists-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default async function fetchDoctorLists(setListDetails: React.Dispatch<React.SetStateAction<DoctorListDetails>>): Promise<void> {
  try {
    const response = await ListsDataService.fillDoctorLists()
    setListDetails(response.data)
    sessionStorage.setItem("ListDetails", JSON.stringify(response.data))
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}

