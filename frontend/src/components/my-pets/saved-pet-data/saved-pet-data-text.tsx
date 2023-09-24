import dayjs from "dayjs"

export default function SavedPetDataText ({ pet } : { pet: SavedPetItem }) {
	return (
		<div>
			<p>{pet.pet}</p>
			<p>Gender: {pet.gender}</p>
			<p>Date of Birth: {dayjs(pet.dateOfBirth).format("MMMM D, YYYY")}</p>
			<p>Insurance Name: {pet.insuranceName}</p>
			{/* Add other pet details as needed */}
		</div>
	)
}
