import dayjs from "dayjs"

export default new class TimeUtils {
  createFormattedDate() {
    const newDateObject = new Date()
    const format = "YYYY-MM-DD HH:mm:ss"
    const createdAt = dayjs(newDateObject).format(format)
    return createdAt
  }

  cleanDateString(dateStr) {
    // Remove "th", "st", "nd", "rd" from the date
    const newDateStr = dateStr.replace(/\b(\d+)(th|st|nd|rd)\b/g, "$1")
    return newDateStr
  }

  convertDOBStringIntoMySQLDate(month, day, year) {
    const dateOfBirthStr = `${month} ${day} ${year}`
    const dateOfBirth = dayjs(dateOfBirthStr, "MMMM D YYYY").format("YYYY-MM-DD")
    return dateOfBirth
  }
}()
