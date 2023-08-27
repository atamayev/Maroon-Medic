import { days } from "../../utils/constants"

const SelectDay = ({ personalInfo, setPersonalInfo }: PersonalInfoProps) => {
	return (
		<>
			<label>
        Day:
				<select required value = {personalInfo.birthDay || -1}
					onChange = {(event) => setPersonalInfo({...personalInfo, birthDay: +event.target.value})}
				>
					<option value = {-1} disabled>
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

export default SelectDay
