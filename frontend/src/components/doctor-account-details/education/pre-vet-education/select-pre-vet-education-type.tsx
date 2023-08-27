import _ from "lodash"

interface Props {
  listDetails: DoctorListDetails
  selectedPreVetEducationType: string
  selectedMajor: string
  setSelectedPreVetEducationType: (value: React.SetStateAction<string>) => void
}

const SelectPreVetEducationType = (props: Props) => {
	const { listDetails, selectedPreVetEducationType, selectedMajor, setSelectedPreVetEducationType } = props

	if (!selectedMajor) return null

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
				{_.uniqBy(listDetails.preVetEducationTypes, "educationType").map(
					(preVetEdType) => (
						<option key = {preVetEdType.pre_vet_education_typeID} value = {preVetEdType.educationType}>
							{preVetEdType.educationType}
						</option>
					)
				)}
			</select>
		</div>
	)
}

export default SelectPreVetEducationType
