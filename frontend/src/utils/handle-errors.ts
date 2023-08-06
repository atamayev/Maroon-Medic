import { AxiosError } from "axios"
import { invalidUserAction } from "src/custom-hooks/user-verification-snippets"

export const handle401AxiosError = (error: unknown): void => {
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      invalidUserAction(error.response.data)
    }
  }
}

export const handle401AxiosErrorAndSetMessageType = (
  error: unknown,
  setFunction: (conf: ConfirmationMessage) => void
): void => {
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      invalidUserAction(error.response.data)
    }
  }
  else setFunction({messageType: "problem"})
}

export const handle401AxiosErrorAndSetCustomError = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  setError: (value: React.SetStateAction<string>) => void
): void => {
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      invalidUserAction(error.response.data)
    }
  }
  else setError(error.response.data)
}
