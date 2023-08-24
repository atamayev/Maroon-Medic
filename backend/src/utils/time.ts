import dayjs, { Dayjs } from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)

export default new class TimeUtils {
	createFormattedDate(): string {
		const newDateObject = new Date()
		const format = "YYYY-MM-DD HH:mm:ss"
		const createdAt = dayjs(newDateObject).format(format)
		return createdAt
	}

	cleanDateString(dateStr: string): string {
		// Remove "th", "st", "nd", "rd" from the date
		const newDateStr = dateStr.replace(/\b(\d+)(th|st|nd|rd)\b/g, "$1")
		return newDateStr
	}

	convertDOBStringIntoMySQLDate(month: string, day: number, year: number): string {
		const dateOfBirthStr = `${month} ${day} ${year}`
		const dateOfBirth = dayjs(dateOfBirthStr, "MMMM D YYYY").format("YYYY-MM-DD")
		return dateOfBirth
	}

	convertMySQLDateIntoReadableString(date: string): string {
		const dateOfBirth = dayjs(date).format("MMMM D, YYYY, h:mm A")
		return dateOfBirth
	}

	convertAppointmentDateTimeIntoMySQLDate(appointmentDate: string, appointmentTime: string): string {
		const cleanDateStr = this.cleanDateString(appointmentDate)
		const timeStr = appointmentTime
		const dateTimeStr = `${cleanDateStr} ${timeStr}`

		const dateTimeStrFormatted = dateTimeStr.split(", ").slice(1).join(" ")

		const dateTime = dayjs(dateTimeStrFormatted)

		const mysqlDateTime = dateTime.format("YYYY-MM-DD HH:mm:ss")
		return mysqlDateTime
	}

	simpleDayJSConvert(date: string): Dayjs {
		return dayjs(date)
	}
}()
