/* eslint-disable @typescript-eslint/naming-convention, filenames/match-regex */
import { v4 as uuidv4 } from "uuid"
import UUIDDB from "../db/UUID-db"

export async function ID_to_UUID(userId: number): Promise<string> {
	const UUID = uuidv4()

	try {
		await UUIDDB.createNewUUID(UUID, userId)
		return UUID
	} catch (error: unknown) {
		throw new Error(`Unable to convert userId to UUID ${userId}`)
	}
}

export async function UUID_to_ID(UUID: string): Promise<number> {
	if (!UUID) throw new Error(`No UUID received in ${UUID_to_ID.name}`)

	try {
		const userId = await UUIDDB.retrieveUUID(UUID)
		return userId
	} catch (error: unknown) {
		throw new Error(`No userId found for UUID: ${UUID}`)
	}
}
