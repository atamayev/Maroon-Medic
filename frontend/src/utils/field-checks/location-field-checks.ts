function isAddressValid(address: DoctorAddressData): boolean {
	return Boolean(
		address.addressTitle &&
		address.addressLine1 &&
		address.city &&
		address.state &&
		address.zip &&
		address.country &&
		address.phone
	)
}

function areTimesValid(times: { startTime?: string; endTime?: string }[]): boolean {
	for (const time of times) {
		if (!time.startTime || !time.endTime) return false
	}
	return true
}

export function areAllFieldsValid(address: DoctorAddressData): boolean {
	return isAddressValid(address) && areTimesValid(address.times)
}

export function areAllTimesValid(address: DoctorAddressData): boolean {
	for (const time of address.times) {
		if (new Date(`1970-01-01T${time.endTime}:00`) <= new Date(`1970-01-01T${time.startTime}:00`)) {
			return false
		}
	}
	return true
}
