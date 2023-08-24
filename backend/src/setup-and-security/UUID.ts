import { v4 as uuidv4 } from "uuid"
import UUIDDB from "../db/UUID-DB"
import TimeUtils from "../utils/time"

export async function ID_to_UUID(UserID: number): Promise<string> {
	const UUID = uuidv4()
	const createdAt = TimeUtils.createFormattedDate()

	try {
		await UUIDDB.createNewUUID(UUID, createdAt, UserID)
		return UUID
	} catch (error: unknown) {
		throw new Error(`Unable to convert UserID to UUID ${UserID}`)
	}
}

export async function UUID_to_ID(UUID: string): Promise<number> {
	if (!UUID) throw new Error(`no UUID received in ${UUID_to_ID.name}`)

	try {
		const UserID = await UUIDDB.retrieveUUID(UUID)
		return UserID
	} catch (error: unknown) {
		throw new Error(`No UserID found for UUID: ${UUID}`)
	}
}
