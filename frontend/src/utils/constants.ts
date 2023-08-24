export const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
]

export const days = [...Array(31).keys()].map(i => i + 1)

const currentYear = new Date().getFullYear()

export const birthYears = Array.from({length: 63}, (_, i) => currentYear - i - 18)

export const educationYears = [...Array(60).keys()].map(i => i + currentYear - 60).reverse()

export const daysOfWeek: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

