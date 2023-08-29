import { Dayjs } from "dayjs"
import TimeUtils from "./time"
import _ from "lodash"

export default new class Format {
	personalData(results: {firstName: string, lastName: string, gender: string, dateOfBirth: string}): FormattedPersonalData {
		const dateOfBirth: Dayjs = TimeUtils.simpleDayJSConvert(results.dateOfBirth)
		const personalData = {
			firstName: results.firstName,
			lastName: results.lastName,
			gender: results.gender,
			birthMonth: dateOfBirth.format("MMMM"),
			birthDay: dateOfBirth.date(),
			birthYear: dateOfBirth.year()
		}
		return personalData
	}

	educationDates (date: Date | string): string {
		const formattedDate = new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
		return formattedDate
	}

	addressDataToBoolean (addressData: PrivateDoctorAddressData[]): PrivateDoctorAddressData[] {
		return addressData.map((address) => ({
			...address,
			addressPublicStatus: Boolean(address.addressPublicStatus),
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
