import AuthDB from "../db/auth-DB"
import TimeUtils from "./time"

export async function loginHistory(userId: number): Promise<void> {
	const loginAt = TimeUtils.createFormattedDate()

	try {
		await AuthDB.addLoginHistory(userId, loginAt)
		return
	} catch (error: unknown) {
		console.log("Problem with adding login history", error)
	}
}

//TODO:, create a function that logs profile updates
