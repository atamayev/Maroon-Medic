import handleInputChange from "src/helper-functions/patient/new-pet/handle-input-change/handle-input-change"

interface Props {
  newPetData: PetItemForCreation
  petTypes: ServicedPetItem[]
  insurances: InsuranceItem[]
  setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
}

const PetGenderSection = (props: Props) => {
	const { newPetData, petTypes, insurances, setNewPetData } = props

	return (
		<div className="mb-4" id="formPetGender">
			<label className="block text-sm font-medium text-gray-700">Gender</label>
			<div className="mt-2">
				<label className="inline-flex items-center">
					<input
						type="radio"
						name="Gender"
						value="Male"
						onChange={(e) => handleInputChange(e, newPetData, petTypes, insurances, setNewPetData)}
						className="form-radio text-green-600"
					/>
					<span className="ml-2">Male</span>
				</label>
				<label className="inline-flex items-center ml-6">
					<input
						type="radio"
						name="Gender"
						value="Female"
						onChange={(e) => handleInputChange(e, newPetData, petTypes, insurances, setNewPetData)}
						className="form-radio text-green-600"
					/>
					<span className="ml-2">Female</span>
				</label>
			</div>
		</div>
	)
}

export default PetGenderSection
