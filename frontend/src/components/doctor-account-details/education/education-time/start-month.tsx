import { months } from "../../../../utils/constants"

interface Props {
  timeState: TimeState
  setTimeState: React.Dispatch<React.SetStateAction<TimeState>>
}

const SelectStartMonth = (props: Props) => {
	const { timeState, setTimeState } = props

	return (
		<div>
			<label>
        Start Month:
				<select
					name = "startMonth"
					value = {timeState.startMonth || ""}
					onChange = {e => {
						const newStartMonth = e.target.value
						let newEndMonth = timeState.endMonth

						if (months.indexOf(newStartMonth) >= months.indexOf(timeState.endMonth) && timeState.startYear === timeState.endYear) {
							newEndMonth = ""
						}

						setTimeState(prevState =>({...prevState, startMonth: newStartMonth, endMonth: newEndMonth}))
					}}
				>
					<option value = "" disabled>Select a Start Month</option>
					{months.map(month => (
						<option key = {month} value = {month}>{month}</option>
					))}
				</select>
			</label>
		</div>
	)
}

export default SelectStartMonth
