import handlePetInfoInput from "src/helper-functions/patient/new-pet/handle-input-change/handle-pet-info-input"

interface Props {
  newPetData: PetItemForCreation
  setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
}

const PetGenderSection = (props: Props) => {
	const { newPetData, setNewPetData } = props

	return (
		<div className="mb-4" id="formPetGender">
			<label className="block text-sm font-medium text-gray-700">Gender</label>
			<div className="mt-2">
				<label className="inline-flex items-center">
					<input
						type="radio"
						name="Gender"
						value="Male"
						checked = {newPetData.gender === "Male"}
						onChange={(e) => handlePetInfoInput(e, newPetData, setNewPetData)}
						className="form-radio text-green-600"
						required
					/>
					<span className="ml-2">Male</span>
				</label>
				<label className="inline-flex items-center ml-6">
					<input
						type="radio"
						name="Gender"
						value="Female"
						checked = {newPetData.gender === "Female"}
						onChange={(e) => handlePetInfoInput(e, newPetData, setNewPetData)}
						className="form-radio text-green-600"
						required
					/>
					<span className="ml-2">Female</span>
				</label>
			</div>
		</div>
	)
}

export default PetGenderSection
