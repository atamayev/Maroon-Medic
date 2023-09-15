import _ from "lodash"
import { useContext, useState, useEffect } from "react"
import { observer } from "mobx-react"
import { AppContext } from "src/contexts/maroon-context"

interface Props {
	selectedOrganization: string
	handleSpecialtyChange: (e: React.ChangeEvent<HTMLSelectElement>) => Promise<void>
}

function SelectSpecialty (props: Props) {
	const { handleSpecialtyChange, selectedOrganization } = props
	const { doctorLists, doctorAccountDetails } = useContext(AppContext)
	const [specificSpecialtiesOptions, setSpecificSpecialtiesOptions] = useState<JSX.Element[]>([])

	useEffect(() => {
		if (
			_.isNull(doctorLists) ||
			_.isEmpty(doctorLists.specialties) ||
			_.isNull(doctorAccountDetails)
		) return

		const specialties = selectedOrganization
			? doctorLists.specialties.filter((item) => item.organizationName === selectedOrganization)
			: []

		const newOptions = specialties
			.filter((specialty) =>
				!doctorAccountDetails.specialties.find(
					(doctorSpecialty) =>
						doctorSpecialty.specialtiesListId === specialty.specialtiesListId
				)
			)
			.map((specialty) => (
				<option key={specialty.specialtiesListId} value={specialty.specialtiesListId}>
					{specialty.specialtyName}
				</option>
			))

		setSpecificSpecialtiesOptions(newOptions)

	}, [doctorLists, doctorAccountDetails, selectedOrganization])

	if (!selectedOrganization) return null

	return (
		<div>
			<label htmlFor = "specialty">Select a specialty: </label>
			<select
				id = "specialty"
				name = "specialty"
				value = {""}
				onChange = {(e) => handleSpecialtyChange(e)}
			>
				<option value = "" disabled>Choose a specialty</option>
				{specificSpecialtiesOptions}
			</select>
		</div>
	)
}

export default observer(SelectSpecialty)
