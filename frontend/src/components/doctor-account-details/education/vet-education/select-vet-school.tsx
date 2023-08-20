import _ from "lodash"

interface Props {
  listDetails: DoctorListDetails
  selectedVetSchool: string
  setSelectedVetSchool: (value: React.SetStateAction<string>) => void
}

const SelectVetSchool = (props: Props) => {
  const { listDetails, selectedVetSchool, setSelectedVetSchool } = props

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
        {_.uniqBy(listDetails.vetSchools, "School_name").map(
          (school) => (
            <option key = {school.vet_school_listID} value = {school.School_name}>
              {school.School_name}
            </option>
          )
        )}
      </select>
    </div>
  )
}

export default SelectVetSchool
