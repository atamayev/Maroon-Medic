import _ from "lodash"
import { useContext } from "react"
import { observer } from "mobx-react"
import AppContext from "src/contexts/maroon-context"
import SingleSavedPreVetEducation from "./single-saved-pre-vet-education"

interface Props {
	deleteStatuses: DeleteStatusesDictionary
	setDeleteStatuses: React.Dispatch<React.SetStateAction<DeleteStatusesDictionary>>
	handleDeleteOnClick: (PreVetEducation: PreVetEducationItem) => void
}

function SavedPreVetEducationList (props: Props) {
	const { deleteStatuses, setDeleteStatuses, handleDeleteOnClick } = props
	const doctorAccountDetails = useContext(AppContext).privateDoctorData?.doctorAccountDetails

	if (_.isNil(doctorAccountDetails)) return null

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

export default observer(SavedPreVetEducationList)
