interface Props {
  selectedOrganization: string
  specificSpecialtiesOptions: JSX.Element[]
  handleSpecialtyChange: (e: React.ChangeEvent<HTMLSelectElement>) => Promise<void>
}

export default function SelectSpecialty (props: Props) {
	const { handleSpecialtyChange, selectedOrganization, specificSpecialtiesOptions } = props

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
