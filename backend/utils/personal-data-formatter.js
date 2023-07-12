export function formatPersonalData(results, dob) {
  const PersonalData = {
    FirstName: results[0].FirstName,
    LastName: results[0].LastName,
    Gender: results[0].Gender,
    DOB_month: dob.format("MMMM"),  // getting month name
    DOB_day: dob.date().toString(),  // getting day
    DOB_year: dob.year().toString()  // getting year
  }
  return PersonalData
}
