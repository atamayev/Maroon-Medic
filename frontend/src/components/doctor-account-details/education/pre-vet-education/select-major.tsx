import _ from "lodash"

interface Props {
	listDetails: DoctorListDetails
	selectedPreVetSchool: string
	selectedMajor: string
	setSelectedMajor: (value: React.SetStateAction<string>) => void
}

export default function SelectMajor (props: Props) {
	const { listDetails, selectedPreVetSchool, selectedMajor, setSelectedMajor } = props

	if (!selectedPreVetSchool) return null

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
				{_.uniqBy(listDetails.majors, "majorName").map(
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
