import { birthYears } from "../../utils/constants"

export default function SelectYear ({ personalInfo, setPersonalInfo }: PersonalInfoProps) {
	return (
		<>
			<label>
				Year:
				<select required value = {personalInfo.birthYear || -1}
					onChange = {(event) => setPersonalInfo({...personalInfo, birthYear: +event.target.value})}
				>
					<option value = {-1} disabled>
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
