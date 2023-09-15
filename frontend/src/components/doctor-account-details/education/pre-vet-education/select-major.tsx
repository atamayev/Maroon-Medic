import _ from "lodash"
import { observer } from "mobx-react"
import { useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"

interface Props {
	selectedPreVetSchool: string
	selectedMajor: string
	setSelectedMajor: (value: React.SetStateAction<string>) => void
}

function SelectMajor (props: Props) {
	const { selectedPreVetSchool, selectedMajor, setSelectedMajor } = props
	const { doctorLists } = useContext(AppContext)

	if (!selectedPreVetSchool || _.isNull(doctorLists)) return null

	return (
		<>
			<label htmlFor = "major">Select a Major: </label>
			<select
				id = "major"
				name = "major"
				value = {selectedMajor}
				onChange = {(event) => setSelectedMajor(event.target.value)}
			>
				<option value = "" disabled>Choose a major</option>
				{_.uniqBy(doctorLists.majors, "majorName").map(
					(major) => (
						<option key = {major.majorListId} value = {major.majorName}>
							{major.majorName}
						</option>
					)
				)}
			</select>
		</>
	)
}

export default observer(SelectMajor)
