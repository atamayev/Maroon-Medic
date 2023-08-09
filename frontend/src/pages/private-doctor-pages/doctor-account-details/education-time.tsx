import { months, educationYears } from "../../../utils/constants"

interface Props {
  timeState: TimeState
  setTimeState: React.Dispatch<React.SetStateAction<TimeState>>
}

export default function EducationTime(props: Props) {
  const { timeState, setTimeState } = props

  const RenderStartMonthSection = () => {
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

  const RenderStartYearSection = () => {
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

  const RenderEndMonthSection = () => {
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

  const RenderEndYearSection = () => {
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

  return (
    <div>
      <RenderStartMonthSection />
      <RenderStartYearSection />
      <RenderEndMonthSection />
      <RenderEndYearSection />
    </div>
  )
}
