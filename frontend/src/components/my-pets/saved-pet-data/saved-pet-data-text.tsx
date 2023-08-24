import moment from "moment"

const SavedPetDataText = ({ pet } : { pet: SavedPetItem }) => {
	return (
		<div>
			<p>{pet.Pet}</p>
			<p>Gender: {pet.Gender}</p>
			<p>Date of Birth: {moment(pet.DOB).format("MMMM Do, YYYY")}</p>
			<p>Insurance Name: {pet.insuranceName}</p>
			{/* Add other pet details as needed */}
		</div>
	)
}

export default SavedPetDataText
