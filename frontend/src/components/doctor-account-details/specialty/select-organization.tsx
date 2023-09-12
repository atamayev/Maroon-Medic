import _ from "lodash"
import { useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"

interface Props {
  selectedOrganization: string
  setSelectedOrganization: (value: React.SetStateAction<string>) => void
}

export default function SelectOrganization (props: Props) {
	const { selectedOrganization, setSelectedOrganization } = props
	const { doctorLists } = useContext(AppContext)

	if (_.isNull(doctorLists)) return null

	return (
		<div>
			<label htmlFor = "organization">Select an organization: </label>
			<select
				id = "organization"
				name = "organization"
				value = {selectedOrganization}
				onChange = {(e) => setSelectedOrganization(e.target.value)}
			>
				<option value = "" disabled>Choose an organization</option>
				{_.uniq(doctorLists.specialties.map((item) => item.organizationName)).map(
					(organization) => (
						<option key = {organization} value = {organization}>
							{organization}
						</option>
					))}
			</select>
		</div>
	)
}
