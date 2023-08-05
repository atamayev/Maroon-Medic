import { AxiosError } from "axios"
import { invalidUserAction } from "src/custom-hooks/user-verification-snippets"

export const handle401AxiosError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      invalidUserAction(error.response.data)
    }
  }
}

export const handle401AxiosErrorAndSetMessageType = (error: unknown, setFunction: (conf: ConfirmationMessage) => void) => {
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      invalidUserAction(error.response.data)
    }
  }
  else setFunction({messageType: "problem"})
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handle401AxiosErrorAndSetCustomError = (error: any, setError: (value: React.SetStateAction<string>) => void) => {
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      invalidUserAction(error.response.data)
    }
  }
  else setError(error.response.data)
}
