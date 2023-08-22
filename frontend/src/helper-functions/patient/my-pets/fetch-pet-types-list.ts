import ListsDataService from "src/services/lists-data-service"
import { handle401AxiosError } from "src/utils/handle-errors"

export default async function fetchPetTypesList(
  setPetTypes: React.Dispatch<React.SetStateAction<ServicedPetItem[]>>
): Promise<void> {
  try {
    const response = await ListsDataService.fillPetTypes()
    setPetTypes(response.data)
    sessionStorage.setItem("PetTypes", JSON.stringify(response.data))
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}

