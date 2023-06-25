import { months, educationYears } from '../../../components/constants';

export default function EducationTime(props) {
  const { timeState, setTimeState } = props;
  const renderStartMonthSection = () => {
    return (
      <label>
        Start Month:
        <select 
          name = "startMonth" 
          value = {timeState.startMonth || ""} 
          onChange = {e => setTimeState(prevState =>({...prevState, startMonth: e.target.value}))}
        >
          <option value = "" disabled>Select a Start Month</option>
          {months.map(month => (
            <option key = {month} value = {month}>{month}</option>
          ))}
        </select>
      </label>
    )
  }

  const renderStartYearSection = () => {
    return (
      <label>
        Start Year:
        <select 
          name = "startYear"
          value = {timeState.startYear || ""} 
          onChange = {e => setTimeState(prevState =>({...prevState, startYear: e.target.value}))}
        >
          <option value = "" disabled>Select a Start Year</option>
          {educationYears.map(year => (
            <option key = {year + 1} value = {year + 1}>{year + 1}</option>
          ))}
        </select>
      </label>
    )
  }

  const renderEndMonthSection = () => {
    return (
      <label>
        End Month:
        <select 
          name = "endMonth" 
          value = {timeState.endMonth || ""} 
          onChange = {e => setTimeState(prevState =>({...prevState, endMonth: e.target.value}))}
        >
          <option value = "" disabled>Select an End Month</option>
          {months.map(month => (
            <option key = {month} value = {month}>{month}</option>
          ))}
        </select>
      </label>
    )
  }

  const renderEndYearSection = () => {
    return (
      <label>
        End Year:
        <select 
          name = "endYear"
          value = {timeState.endYear || ""} 
          onChange = {e => setTimeState(prevState =>({...prevState, endYear: e.target.value}))}
        >
          <option value = "" disabled>Select an End Year</option>
          {educationYears.map(year => (
            <option key = {year + 1} value = {year + 1}>{year + 1}</option>
          ))}
        </select>
      </label>
    )
  }

  return (
    <div>
      {renderStartMonthSection()}
      <br />
      {renderStartYearSection()}
      <br />
      {renderEndMonthSection()}
      <br />
      {renderEndYearSection()}
      <br />
    </div>
  )
};
