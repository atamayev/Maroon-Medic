import AuthDB from "../db/auth-DB"
import TimeUtils from "./time"

export async function loginHistory(UserID: number): Promise<void> {
	const loginAt = TimeUtils.createFormattedDate()

	try {
		await AuthDB.addLoginHistory(UserID, loginAt)
		return
	} catch (error: unknown) {
		console.log("Problem with adding login history")
	}
}

//TODO:, create a function that logs profile updates
