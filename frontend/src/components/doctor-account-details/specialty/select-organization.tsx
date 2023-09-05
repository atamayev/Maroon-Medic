import _ from "lodash"

interface Props {
  listDetails: DoctorListDetails
  selectedOrganization: string
  setSelectedOrganization: (value: React.SetStateAction<string>) => void
}

export default function SelectOrganization (props: Props) {
	const { listDetails, selectedOrganization, setSelectedOrganization } = props

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
				{_.uniq(listDetails.specialties.map((item) => item.organizationName)).map(
					(organization) => (
						<option key = {organization} value = {organization}>
							{organization}
						</option>
					))}
			</select>
		</div>
	)
}