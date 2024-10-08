import { AxiosError } from "axios"
import invalidUserAction from "../invalid-user-action"

const handle401AxiosErrorAndSetCustomError = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error: any,
	setError: (value: React.SetStateAction<string>) => void
): void => {
	if (error instanceof AxiosError) {
		if (error.response?.status === 401) {
			invalidUserAction(error.response.data)
		} else if (error.response) {
			setError(error.response.data.error || "An unexpected error occurred.")
		}
	}

	else setError(error.response.data)
}

export default handle401AxiosErrorAndSetCustomError
