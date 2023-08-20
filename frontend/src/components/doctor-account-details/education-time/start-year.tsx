import { educationYears } from "src/utils/constants"

interface Props {
  timeState: TimeState
  setTimeState: React.Dispatch<React.SetStateAction<TimeState>>
}

const SelectStartYear = (props: Props) => {
  const { timeState, setTimeState } = props

  return (
    <div>
      <label>
        Start Year:
        <select
          name = "startYear"
          value = {timeState.startYear || ""}
          onChange = {e => {
            const newStartYear = e.target.value
            let newEndYear = timeState.endYear

            if (educationYears.indexOf(Number(newStartYear)) < educationYears.indexOf(Number(timeState.endYear))) {
              newEndYear = ""
            }

            setTimeState(prevState =>({...prevState, startYear: newStartYear, endYear: newEndYear}))
          }}
        >
          <option value = "" disabled>Select a Start Year</option>
          {educationYears.map(year => (
            <option key = {year + 1} value = {year + 1}>{year + 1}</option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default SelectStartYear
