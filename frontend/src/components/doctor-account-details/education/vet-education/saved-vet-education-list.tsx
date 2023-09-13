import _ from "lodash"
import { useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"
import SingleSavedVetEducation from "./single-saved-vet-education"

interface Props {
	deleteStatuses: DeleteStatusesDictionary
	setDeleteStatuses: React.Dispatch<React.SetStateAction<DeleteStatusesDictionary>>
	handleDeleteOnClick: (VetEducation: VetEducationItem) => void
}

export default function SavedVetEducationList (props: Props) {
	const { deleteStatuses, setDeleteStatuses, handleDeleteOnClick } = props
	const { doctorAccountDetails } = useContext(AppContext)

	if (_.isNull(doctorAccountDetails)) return null

	return (
		<ul>
			{doctorAccountDetails.vetEducation.map((singleVetEducation) => (
				<SingleSavedVetEducation
					key = {singleVetEducation.vetEducationMappingId}
					singleVetEducation = {singleVetEducation}
					deleteStatuses = {deleteStatuses}
					setDeleteStatuses = {setDeleteStatuses}
					handleDeleteOnClick = {handleDeleteOnClick}
				/>
			))}
		</ul>
	)
}
