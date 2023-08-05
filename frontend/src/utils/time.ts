export function getDayIndex(day: string): DayIndeces {
  switch (day) {
  case "Sunday": return 0
  case "Monday": return 1
  case "Tuesday": return 2
  case "Wednesday": return 3
  case "Thursday": return 4
  case "Friday": return 5
  case "Saturday": return 6
  default: return null
  }
}
