import AuthDB from "../db/auth-db"

export async function loginHistory(userId: number): Promise<void> {
	try {
		await AuthDB.addLoginHistory(userId)
		return
	} catch (error: unknown) {
		console.log("Problem with adding login history", error)
	}
}

//TODO:, create a function that logs profile updates
