import { educationYears, months } from "src/utils/constants"

interface Props {
  timeState: TimeState
  setTimeState: React.Dispatch<React.SetStateAction<TimeState>>
}

const SelectEndYear = (props: Props) => {
	const { timeState, setTimeState } = props

	const startYearIndex = educationYears.indexOf(Number(timeState.startYear))
	const yearsToDisplay = educationYears.slice(0, startYearIndex + 1)

	return (
		<div>
			<label>
        End Year:
				<select
					name = "endYear"
					value = {timeState.endYear || ""}
					onChange = {e => {
						const newEndYear = e.target.value
						let newEndMonth = timeState.endMonth

						// Check if the selected end month is before or the same as the start month
						// and if the selected end year is the same as the start year
						if (
							months.indexOf(newEndMonth) < months.indexOf(timeState.startMonth) &&
              timeState.startYear === newEndYear
						) {
							newEndMonth = ""
						}

						setTimeState(prevState => ({
							...prevState,
							endYear: newEndYear,
							endMonth: newEndMonth
						}))
					}}
				>
					<option value = "" disabled>Select an End Year</option>
					{yearsToDisplay.map(year => (
						<option key = {year + 1} value = {year + 1}>{year + 1}</option>
					))}
				</select>
			</label>
		</div>
	)
}

export default SelectEndYear
