import React from 'react'

const months = [
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
];

const currentYear = new Date().getFullYear();
const years = [...Array(60).keys()].map(i => i + currentYear - 60).reverse();

export default function EducationTime(props) {
  const { timeState, setTimeState } = props;
  const renderStartMonthSection = () => {
    return (
      <label>
        Start Month:
        <select 
          name="startMonth" 
          value = {timeState.startMonth} 
          onChange = {e => setTimeState(prevState =>({...prevState, startMonth: e.target.value}))}>
          {months.map(month => (
            <option key={month} value={month}>{month}</option>
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
          value={timeState.startYear} 
          onChange = {e => setTimeState(prevState =>({...prevState, startYear: e.target.value}))}>
          {years.map(year => (
            <option key={year + 1} value={year + 1}>{year + 1}</option>
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
          name="endMonth" 
          value = {timeState.endMonth} 
          onChange = {e => setTimeState(prevState =>({...prevState, endMonth: e.target.value}))}>
          {months.map(month => (
            <option key={month} value={month}>{month}</option>
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
          value={timeState.endYear} 
          onChange = {e => setTimeState(prevState =>({...prevState, endYear: e.target.value}))}>
          {years.map(year => (
            <option key={year + 1} value={year + 1}>{year + 1}</option>
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
