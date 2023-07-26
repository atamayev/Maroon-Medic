import { Form } from "react-bootstrap"
import { months, days, birthYears } from "../utils/constants"
import FormGroup from "./form-group"

interface Props {
  personalInfo: PersonalInfo,
  setPersonalInfo: (personalInfo: PersonalInfo) => void
}

type PersonalInfo = {
  FirstName: string,
  LastName: string,
  DOB_month: string,
  DOB_day: number,
  DOB_year: number,
  Gender: string
}

export const renderFirstNameSection = ({personalInfo, setPersonalInfo}: Props) => {
  return (
    <FormGroup
      id = "FirstName"
      label = "First Name"
      onChange = {event => setPersonalInfo({...personalInfo, FirstName: event.target.value})}
      pattern = "[A-Za-z]*"
      placeholder = "First Name"
      required
      type = "text"
      value = {personalInfo.FirstName || ""}
    />
  )
}

export const renderLastNameSection = ({personalInfo, setPersonalInfo}: Props) => {
  return (
    <FormGroup
      id = "LastName"
      label = "Last Name"
      onChange = {event => setPersonalInfo({...personalInfo, LastName: event.target.value})}
      pattern = "[A-Za-z]*"
      placeholder = "Last Name"
      required
      type = "text"
      value = {personalInfo.LastName || ""}
    />
  )
}

export const renderGenderSection = ({personalInfo, setPersonalInfo}: Props) => {
  return (
    <FormGroup
      as = "select"
      id = "Gender"
      label = "Gender:"
      required = {true}
      value = {personalInfo.Gender || ""}
      onChange = {(event) => setPersonalInfo({...personalInfo, Gender: event.target.value})}
    >
      <option value = "" disabled>Select</option>
      <option value = "female">Female</option>
      <option value = "male">Male</option>
      <option value = "other">Other</option>
    </FormGroup>
  )
}

const renderSelectMonth = ({personalInfo, setPersonalInfo}: Props) => {
  return (
    <>
      <label>
        Month:
        <select required value = {personalInfo.DOB_month || ""}
          onChange = {(event) => setPersonalInfo({...personalInfo, DOB_month: event.target.value})}
        >
          <option value = "" disabled>
            Select Month
          </option>
          {months.map(month => (
            <option key = {month} value = {month}>
              {month}
            </option>
          ))}
        </select>
      </label>
    </>
  )
}

const renderSelectDay = ({personalInfo, setPersonalInfo}: Props) => {
  return (
    <>
      <label>
        Day:
        <select required value = {personalInfo.DOB_day || 0}
          onChange = {(event) => setPersonalInfo({...personalInfo, DOB_day: +event.target.value})}
        >
          <option value = {0} disabled>
            Select Day
          </option>
          {days.map(day => (
            <option key = {day} value = {day}>
              {day}
            </option>
          ))}
        </select>
      </label>
    </>
  )
}

const renderSelectYear = ({personalInfo, setPersonalInfo}: Props) => {
  return (
    <>
      <label>
        Year:
        <select required value = {personalInfo.DOB_year || 0}
          onChange = {(event) => setPersonalInfo({...personalInfo, DOB_year: +event.target.value})}
        >
          <option value = {0} disabled>
            Select Year
          </option>
          {birthYears.map(year => (
            <option key = {year + 1} value = {year + 1}>
              {year + 1}
            </option>
          ))}
        </select>
      </label>
    </>
  )
}

export const renderDOBSection = ({personalInfo, setPersonalInfo}: Props) => {
  return (
    <div className = "row mt-3 mb-3">
      <Form.Group id = "DOB">
        {renderSelectMonth({personalInfo, setPersonalInfo})}
        {renderSelectDay({personalInfo, setPersonalInfo})}
        {renderSelectYear({personalInfo, setPersonalInfo})}
      </Form.Group>
    </div>
  )
}

