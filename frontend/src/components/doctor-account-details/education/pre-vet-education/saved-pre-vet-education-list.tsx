import _ from "lodash"
import { useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"
import SingleSavedPreVetEducation from "./single-saved-pre-vet-education"

interface Props {
	deleteStatuses: DeleteStatusesDictionary
	setDeleteStatuses: React.Dispatch<React.SetStateAction<DeleteStatusesDictionary>>
	handleDeleteOnClick: (PreVetEducation: PreVetEducationItem) => void
}

export default function SavedPreVetEducationList (props: Props) {
	const { deleteStatuses, setDeleteStatuses, handleDeleteOnClick } = props
	const { doctorAccountDetails } = useContext(AppContext)

	if (_.isNull(doctorAccountDetails)) return null

	return (
		<ul>
			{doctorAccountDetails.preVetEducation.map((singlePreVetEducation) => (
				<SingleSavedPreVetEducation
					key = {singlePreVetEducation.preVetEducationMappingId}
					singlePreVetEducation = {singlePreVetEducation}
					deleteStatuses = {deleteStatuses}
					setDeleteStatuses = {setDeleteStatuses}
					handleDeleteOnClick = {handleDeleteOnClick}
				/>
			))}
		</ul>
	)
}
