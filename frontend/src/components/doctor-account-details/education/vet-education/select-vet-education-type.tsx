import _ from "lodash"

interface Props {
  listDetails: DoctorListDetails
  selectedVetEducationType: string
  selectedVetSchool: string
  setSelectedVetEducationType: (value: React.SetStateAction<string>) => void
}

const SelectVetEducationType = (props: Props) => {
  const { listDetails, selectedVetEducationType, selectedVetSchool, setSelectedVetEducationType } = props

  if (!selectedVetSchool) return null
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
        {_.uniqBy(listDetails.vetEducationTypes, "Education_type").map(
          (vetEdType) => (
            <option key = {vetEdType.vet_education_typeID} value = {vetEdType.Education_type}>
              {vetEdType.Education_type}
            </option>
          )
        )}
      </select>
    </div>
  )
}

export default SelectVetEducationType
