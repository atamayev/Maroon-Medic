import _ from "lodash"

interface Props {
  listDetails: DoctorListDetails
  selectedPreVetSchool: string
  selectedMajor: string
  setSelectedMajor: (value: React.SetStateAction<string>) => void
}

const SelectMajor = (props: Props) => {
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
				{_.uniqBy(listDetails.majors, "Major_name").map(
					(major) => (
						<option key = {major.major_listID} value = {major.Major_name}>
							{major.Major_name}
						</option>
					)
				)}
			</select>
		</>
	)
}

export default SelectMajor
