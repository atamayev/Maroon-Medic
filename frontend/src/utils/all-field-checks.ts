function isAddressValid(address: DoctorAddressData): boolean {
  return !!(
    address.address_title &&
    address.address_line_1 &&
    address.city &&
    address.state &&
    address.zip &&
    address.country
  )
}

function areTimesValid(times: { Start_time?: string; End_time?: string }[]): boolean {
  for (const time of times) {
    if (!time.Start_time || !time.End_time) return false
  }
  return true
}

export function areAllFieldsValid(address: DoctorAddressData): boolean {
  return isAddressValid(address) && areTimesValid(address.times)
}

export function areAllTimesValid(address: DoctorAddressData): boolean {
  for (const time of address.times) {
    if (new Date(`1970-01-01T${time.End_time}:00`) <= new Date(`1970-01-01T${time.Start_time}:00`)) return false
  }
  return true
}
