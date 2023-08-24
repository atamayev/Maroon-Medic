import moment from "moment"

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
		if (input.includes("hour")) return moment.duration(value, "hours").asMinutes()
		else if (input.includes("day")) return moment.duration(value, "days").asMinutes()
		else return value
	}
	return 0
}
