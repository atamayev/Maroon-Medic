import _ from "lodash"
import { useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"

interface Props {
	selectedPreVetEducationType: string
	selectedMajor: string
	setSelectedPreVetEducationType: (value: React.SetStateAction<string>) => void
}

export default function SelectPreVetEducationType (props: Props) {
	const { selectedPreVetEducationType, selectedMajor, setSelectedPreVetEducationType } = props
	const { doctorLists } = useContext(AppContext)

	if (!selectedMajor || _.isNull(doctorLists)) return null

	return (
		<div>
			<label htmlFor = "education-type">Select a Type of Education: </label>
			<select
				id = "education-type"
				name = "education-type"
				value = {selectedPreVetEducationType}
				onChange = {(event) => setSelectedPreVetEducationType(event.target.value)}
			>
				<option value = "" disabled>Choose an Education Type</option>
				{_.uniqBy(doctorLists.preVetEducationTypes, "educationType").map(
					(preVetEdType) => (
						<option key = {preVetEdType.preVetEducationTypeId} value = {preVetEdType.educationType}>
							{preVetEdType.educationType}
						</option>
					)
				)}
			</select>
		</div>
	)
}
