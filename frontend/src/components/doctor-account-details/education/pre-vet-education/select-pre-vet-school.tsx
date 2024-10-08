import _ from "lodash"
import { observer } from "mobx-react"
import { useContext } from "react"
import AppContext from "src/contexts/maroon-context"

interface Props {
	selectedPreVetSchool: string
	setSelectedPreVetSchool: (value: React.SetStateAction<string>) => void
}

function SelectPreVetSchool (props: Props) {
	const { selectedPreVetSchool, setSelectedPreVetSchool } = props
	const doctorLists = useContext(AppContext).privateDoctorData?.doctorLists

	if (_.isNil(doctorLists)) return null

	return (
		<div>
			<label htmlFor = "pre-vet-school">Select a school: </label>
			<select
				id = "pre-vet-school"
				name = "pre-vet-school"
				value = {selectedPreVetSchool}
				onChange = {(e) => setSelectedPreVetSchool(e.target.value)}
			>
				<option value = "" disabled>Choose a School</option>
				{_.uniqBy(doctorLists.preVetSchools, "schoolName").map(
					(school) => (
						<option key = {school.preVetSchoolListId} value = {school.schoolName}>
							{school.schoolName}
						</option>
					)
				)}
			</select>
		</div>
	)
}

export default observer(SelectPreVetSchool)
