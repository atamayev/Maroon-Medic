/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import _ from "lodash"
import FetchDoctorAccountDataDB from "../db/private-doctor-data/fetch-doctor-account-data-DB"
import SaveDoctorDataDB from "../db/private-doctor-data/save-doctor-data-DB"

export default async function findAppointmentTimeDifference (newTimes: DoctorAvailability[], addressId: number): Promise<void> {
	const oldTimes = await FetchDoctorAccountDataDB.availabilityData(addressId)

	const groupedNewData = _.keyBy(newTimes, "dayOfWeek")
	const groupedOldData = _.keyBy(oldTimes, "dayOfWeek")

	const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
	for (const day of days) {
		const newTimeSlot = groupedNewData[day]
		const oldTimeSlot = groupedOldData[day]

		// If the day exists in the new data but not in the old data, it should be added
		if (newTimeSlot && !oldTimeSlot) {
			await SaveDoctorDataDB.addAvailbilityData(newTimeSlot, addressId)
			continue
		}

		// If the day exists in the old data but not in the new data, it should be deleted
		if (!newTimeSlot && oldTimeSlot) {
			await SaveDoctorDataDB.deleteSpecificDayAvailbilityData(oldTimeSlot, addressId)
			continue
		}

		// If the start/end times differ for the same day, the record needs to be updated
		if (newTimeSlot && oldTimeSlot && !_.isEqual(newTimeSlot, oldTimeSlot)) {
			await SaveDoctorDataDB.updateTimeAvailbilityData(newTimeSlot, addressId)
		}
	}
}
