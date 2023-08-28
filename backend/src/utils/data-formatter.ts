import { Dayjs } from "dayjs"
import TimeUtils from "./time"
import _ from "lodash"

export default new class Format {
	personalData(results: {FirstName: string, LastName: string, gender: string, dateOfBirth: string}): FormattedPersonalData {
		const dateOfBirth: Dayjs = TimeUtils.simpleDayJSConvert(results.dateOfBirth)
		const PersonalData = {
			FirstName: results.FirstName,
			LastName: results.LastName,
			gender: results.gender,
			birthMonth: dateOfBirth.format("MMMM"),
			birthDay: dateOfBirth.date(),
			birthYear: dateOfBirth.year()
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
			instantBook: Boolean(address.instantBook),
		}))
	}

	servicePriceToNumber (services: DetailedServiceItem[]): DetailedServiceItem[] {
		const updatedServices = _.map(services, (service) => {
			const price = Number(service.servicePrice)
			return { ...service, servicePrice: isNaN(price) ? 0 : price }
		})
		return updatedServices
	}
}()
