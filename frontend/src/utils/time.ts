import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
dayjs.extend(duration)

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

export function convertToMinutes(input: string): number {
	if (typeof input === "string") {
		const value = parseInt(input.split(" ")[0])
		if (input.includes("hour")) return dayjs.duration(value, "hour").as("minute")
		else if (input.includes("day")) return dayjs.duration(value, "day").as("minute")
		else return value
	}
	return 0
}
