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

const years = [...Array(100).keys()].map(i => i + new Date().getFullYear() - 100);

export default function EducationTime(props) {
  return (
    <div>
        <label>
          Start Month:
          <select name="startMonth" value = {props.startMonth} onChange = {e => props.setStartMonth(e.target.value)}>
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Start Year:
          <select value={props.startYear} onChange={e => props.setStartYear(e.target.value)}>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          End Month:
          <select name="endMonth" value = {props.endMonth} onChange = {e => props.setEndMonth(e.target.value)}>
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          End Year:
          <select value={props.endYear} onChange={e => props.setEndYear(e.target.value)}>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </label>
        <br />
    </div>
  )
}
