import SelectEndMonth from "./end-month"
import SelectEndYear from "./end-year"
import SelectStartMonth from "./start-month"
import SelectStartYear from "./start-year"

interface Props {
  timeState: TimeState
  setTimeState: React.Dispatch<React.SetStateAction<TimeState>>
}

export default function EducationTime(props: Props) {
  const { timeState, setTimeState } = props

  return (
    <div>
      <SelectStartMonth timeState = {timeState} setTimeState = {setTimeState} />
      <SelectStartYear timeState = {timeState} setTimeState = {setTimeState} />
      <SelectEndMonth timeState = {timeState} setTimeState = {setTimeState} />
      <SelectEndYear timeState = {timeState} setTimeState = {setTimeState} />
    </div>
  )
}
