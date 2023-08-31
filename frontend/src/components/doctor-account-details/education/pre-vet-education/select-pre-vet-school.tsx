import _ from "lodash"

interface Props {
	listDetails: DoctorListDetails
	selectedPreVetSchool: string
	setSelectedPreVetSchool: (value: React.SetStateAction<string>) => void
}

export default function SelectPreVetSchool (props: Props) {
	const { listDetails, selectedPreVetSchool, setSelectedPreVetSchool } = props

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
				{_.uniqBy(listDetails.preVetSchools, "schoolName").map(
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
