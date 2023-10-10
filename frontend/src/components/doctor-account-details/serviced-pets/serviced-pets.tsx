import _ from "lodash"
import { observer } from "mobx-react"
import { useContext, useState, useEffect } from "react"
import AppContext from "src/contexts/maroon-context"
import OpenClosePetType from "./open-close-pet-type"
import ShowPetsSection from "./show-pets-section"

type PetTypesType = {
	[key: string]: ServicedPetItem[]
}

interface Props {
	expandedPetTypes: string[]
	setExpandedPetTypes: React.Dispatch<React.SetStateAction<string[]>>
	setPetsConfirmation: (conf: ConfirmationMessage) => void
}

function ServicedPets (props: Props) {
	const { expandedPetTypes, setExpandedPetTypes, setPetsConfirmation } = props
	const doctorLists = useContext(AppContext).privateDoctorData?.doctorLists
	const [petTypes, setPetTypes] = useState<PetTypesType>({})

	useEffect(() => {
		if (_.isNil(doctorLists) || _.isEmpty(doctorLists.pets)) return
		setPetTypes(_.groupBy(doctorLists.pets, "petType"))
	}, [doctorLists])

	return (
		<>
			{Object.entries(petTypes).map(([petType, pets]) => (
				<div key = {petType} className = "mb-3">
					<label htmlFor = {petType}>
						{petType}
					</label>
					<OpenClosePetType
						pets = {pets}
						petType = {petType}
						expandedPetTypes = {expandedPetTypes}
						setExpandedPetTypes = {setExpandedPetTypes}
					/>
					<ShowPetsSection
						pets = {pets}
						petType = {petType}
						setPetsConfirmation = {setPetsConfirmation}
						expandedPetTypes = {expandedPetTypes}
					/>
				</div>
			))}
		</>
	)
}

export default observer(ServicedPets)
