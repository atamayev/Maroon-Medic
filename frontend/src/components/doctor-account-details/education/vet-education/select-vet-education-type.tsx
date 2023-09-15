import _ from "lodash"
import { observer } from "mobx-react"
import { useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"

interface Props {
	selectedVetEducationType: string
	selectedVetSchool: string
	setSelectedVetEducationType: (value: React.SetStateAction<string>) => void
}

function SelectVetEducationType (props: Props) {
	const { selectedVetEducationType, selectedVetSchool, setSelectedVetEducationType } = props
	const { doctorLists } = useContext(AppContext)

	if (!selectedVetSchool || _.isNull(doctorLists)) return null

	return (
		<div>
			<label htmlFor = "education-type">Select a Type of Veterinary Education: </label>
			<select
				id = "vet-education"
				name = "vet-education"
				value = {selectedVetEducationType}
				onChange = {(event) => setSelectedVetEducationType(event.target.value)}
			>
				<option value = "" disabled>Choose an Education Type</option>
				{_.uniqBy(doctorLists.vetEducationTypes, "educationType").map(
					(vetEdType) => (
						<option key = {vetEdType.vetEducationTypeId} value = {vetEdType.educationType}>
							{vetEdType.educationType}
						</option>
					)
				)}
			</select>
		</div>
	)
}

export default observer(SelectVetEducationType)
