import moment from "moment"

export default function SavedPetDataText ({ pet } : { pet: SavedPetItem }) {
	return (
		<div>
			<p>{pet.pet}</p>
			<p>Gender: {pet.gender}</p>
			<p>Date of Birth: {moment(pet.dateOfBirth).format("MMMM Do, YYYY")}</p>
			<p>Insurance Name: {pet.insuranceName}</p>
			{/* Add other pet details as needed */}
		</div>
	)
}
