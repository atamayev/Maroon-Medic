export function areAllFieldsValid(address: DoctorAddressDataType): boolean {
  if (
    !address.address_title ||
    !address.address_line_1 ||
    !address.city ||
    !address.state ||
    !address.zip ||
    !address.country
  ) {
    return false
  }

  // Check for days that are checked off (exist in times array)
  for (const time of address.times) {
    if (!time.Start_time || !time.End_time) return false
  }
  return true
}

export function areAllTimesValid(address: DoctorAddressDataType): boolean {
  for (const time of address.times) {
    if (new Date(`1970-01-01T${time.End_time}:00`) <= new Date(`1970-01-01T${time.Start_time}:00`)) return false
  }
  return true
}
