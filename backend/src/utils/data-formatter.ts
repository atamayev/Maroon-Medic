import { Dayjs } from "dayjs"
import TimeUtils from "./time"

export default new class Format {
	personalData(results: {FirstName: string, LastName: string, Gender: string, DOB: string}): FormattedPersonalData {
		const DOB: Dayjs = TimeUtils.simpleDayJSConvert(results.DOB)
		const PersonalData = {
			FirstName: results.FirstName,
			LastName: results.LastName,
			Gender: results.Gender,
			DOB_month: DOB.format("MMMM"),
			DOB_day: DOB.date(),
			DOB_year: DOB.year()
		}
		return PersonalData
	}

	educationDates (date: Date | string): string {
		const formattedDate = new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
		return formattedDate
	}

	addressDataToBoolean (addressData: PrivateDoctorAddressData[]): PrivateDoctorAddressData[] {
		return addressData.map((address) => ({
			...address,
			address_public_status: Boolean(address.address_public_status),
			instant_book: Boolean(address.instant_book),
		}))
	}
}()
