import { AxiosError } from "axios"
import { invalidUserAction } from "src/custom-hooks/user-verification-snippets"

export const handle401AxiosError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      invalidUserAction(error.response.data)
    }
  }
}
