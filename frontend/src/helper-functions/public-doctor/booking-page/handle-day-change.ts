const handleDayChange = (
	event: React.ChangeEvent<HTMLInputElement>,
	setSelectedDay: React.Dispatch<React.SetStateAction<string | null>>,
	setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>
): void => {
	const value = event.target.value
	setSelectedDay(value === "Select..." ? null : value)
	if (value === "Select...") setSelectedTime(null)
}

export default handleDayChange
