import { months } from "src/utils/constants"

interface Props {
	timeState: TimeState
	setTimeState: React.Dispatch<React.SetStateAction<TimeState>>
}

export default function SelectEndMonth (props: Props) {
	const { timeState, setTimeState } = props
	let monthsToDisplay = months

	if (timeState.startYear === timeState.endYear) {
		const startMonthIndex = months.indexOf(timeState.startMonth)
		monthsToDisplay = months.slice(startMonthIndex + 1)
	}

	return (
		<div>
			<label>
				End Month:
				<select
					name = "endMonth"
					value = {timeState.endMonth || ""}
					onChange = {e => {
						const newEndMonth = e.target.value

						// Check if the selected end month is before or the same as the start month
						// and if the start and end years are the same
						if (
							months.indexOf(newEndMonth) < months.indexOf(timeState.startMonth) &&
              timeState.startYear === timeState.endYear
						) {
							return
						}

						setTimeState(prevState => ({...prevState, endMonth: newEndMonth}))
					}}
				>
					<option value = "" disabled>Select an End Month</option>
					{monthsToDisplay.map(month => (
						<option key = {month} value = {month}>{month}</option>
					))}
				</select>
			</label>
		</div>
	)
}
