import { Dayjs } from "dayjs";
import TimeUtils from "./time";

interface PersonalData {
  FirstName: string
  LastName: string
  Gender: string
  DOB_month: string
  DOB_day: number
  DOB_year: number
}

export default new class DataFormatter {
  formatPersonalData(results: {FirstName: string, LastName: string, Gender: string, DOB: string}): PersonalData {
    const DOB: Dayjs = TimeUtils.simpleDayJSConvert(results.DOB);
    const PersonalData = {
      FirstName: results.FirstName,
      LastName: results.LastName,
      Gender: results.Gender,
      DOB_month: DOB.format("MMMM"),  // getting month name
      DOB_day: DOB.date(),  // getting day
      DOB_year: DOB.year()  // getting year
    }
    return PersonalData;
  }

  formatEducationDates (date: Date | string): string {
    const formattedDate = new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    return formattedDate;
  }
}()
