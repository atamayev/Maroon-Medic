import _ from "lodash"
import { observer } from "mobx-react"
import { useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"

interface Props {
	selectedVetSchool: string
	setSelectedVetSchool: (value: React.SetStateAction<string>) => void
}

function SelectVetSchool (props: Props) {
	const { selectedVetSchool, setSelectedVetSchool } = props
	const { doctorLists } = useContext(AppContext)

	if (_.isNull(doctorLists)) return null

	return (
		<div>
			<label htmlFor = "vet-school">Select a Veterinary School: </label>
			<select
				id = "vet-school"
				name = "vet-school"
				value = {selectedVetSchool}
				onChange = {(e) => setSelectedVetSchool(e.target.value)}
			>
				<option value = "" disabled>Choose a School</option>
				{_.uniqBy(doctorLists.vetSchools, "schoolName").map(
					(school) => (
						<option key = {school.vetSchoolListId} value = {school.schoolName}>
							{school.schoolName}
						</option>
					)
				)}
			</select>
		</div>
	)
}

export default observer(SelectVetSchool)
