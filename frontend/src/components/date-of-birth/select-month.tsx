import { months } from "../../utils/constants"

export default function SelectMonth ({ personalInfo, setPersonalInfo }: PersonalInfoProps) {
	return (
		<>
			<label>
				Month:
				<select required value = {personalInfo.birthMonth || ""}
					onChange = {(event) => setPersonalInfo({...personalInfo, birthMonth: event.target.value})}
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
