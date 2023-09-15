import _ from "lodash"
import { observer } from "mobx-react"
import { AppContext } from "src/contexts/maroon-context"
import SingleSavedSpecialty from "./single-saved-specialty"
import { useContext } from "react"

interface Props {
	deleteStatuses: DeleteStatusesDictionary
	setDeleteStatuses: React.Dispatch<React.SetStateAction<DeleteStatusesDictionary>>
	handleDeleteSpecialty: (specialty: SpecialtyItem) => void
}

function SavedSpecialtyList (props: Props) {
	const { deleteStatuses, setDeleteStatuses, handleDeleteSpecialty } = props
	const { doctorAccountDetails } = useContext(AppContext)

	if (_.isNull(doctorAccountDetails)) return <p>Loading...</p>

	return (
		<ul>
			{doctorAccountDetails.specialties.map((specialty) => (
				<SingleSavedSpecialty
					key = {specialty.specialtiesListId}
					deleteStatuses = {deleteStatuses}
					setDeleteStatuses = {setDeleteStatuses}
					specialty = {specialty}
					handleDeleteSpecialty = {handleDeleteSpecialty}
				/>
			))}
		</ul>
	)
}

export default observer(SavedSpecialtyList)
