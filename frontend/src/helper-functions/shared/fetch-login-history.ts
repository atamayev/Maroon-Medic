import _ from "lodash"
import dayjs from "dayjs"
import SharedDataClass from "src/classes/shared/shared-data-class"
import AuthDataService from "src/services/auth-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default async function fetchLoginHistory(
	setLoginHistory: React.Dispatch<React.SetStateAction<LoginHistoryItem[]>>,
	sharedData: SharedDataClass | null
): Promise<void> {
	if (_.isNull(sharedData)) return
	try {
		const response = await AuthDataService.fetchLoginHistry()
		if (Array.isArray(response.data) && response.data.length > 0 && "loginAt" in response.data[0]) {
			const formattedData = response.data.map((item: LoginHistoryItem) => ({
				...item,
				loginAt: dayjs(item.loginAt).format("MMMM D, YYYY [at] h:mmA")
			}))
			setLoginHistory(formattedData)
			sharedData.loginHistory = formattedData
		}
	} catch (error: unknown) {
		handle401AxiosError(error)
	}
}
