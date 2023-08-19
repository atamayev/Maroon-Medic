import { Form } from "react-bootstrap"
import SelectMonth from "./select-month"
import SelectDay from "./select-day"
import SelectYear from "./select-year"

const DOBSection = ({personalInfo, setPersonalInfo}: PersonalInfoProps) => {
  return (
    <div className = "row mt-3 mb-3">
      <Form.Group id = "DOB">
        <SelectMonth personalInfo = {personalInfo} setPersonalInfo = {setPersonalInfo} />
        <SelectDay personalInfo = {personalInfo} setPersonalInfo = {setPersonalInfo} />
        <SelectYear personalInfo = {personalInfo} setPersonalInfo = {setPersonalInfo} />
      </Form.Group>
    </div>
  )
}

export default DOBSection
