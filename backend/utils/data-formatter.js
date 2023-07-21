import TimeUtils from "./time.js"

export default new class DataFormatter {
  formatPersonalData(results) {
    const DOB = TimeUtils.simpleDayJSConvert(results[0].DOB)
    const PersonalData = {
      FirstName: results[0].FirstName,
      LastName: results[0].LastName,
      Gender: results[0].Gender,
      DOB_month: DOB.format("MMMM"),  // getting month name
      DOB_day: DOB.date().toString(),  // getting day
      DOB_year: DOB.year().toString()  // getting year
    }
    return PersonalData
  }

  formatEducationDates (date) {
    const formattedDate = new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    return formattedDate
  }
}()
