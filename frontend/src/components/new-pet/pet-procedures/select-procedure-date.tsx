import _ from "lodash"
import FormGroup from "src/components/form-group"

interface Props {
	id: number
	procedures: NewPetProcedureItem[]
	setProcedures: React.Dispatch<React.SetStateAction<NewPetProcedureItem[]>>
	showDate: boolean
}

export default function SelectProcedureDate(props: Props) {
	const { id, procedures, setProcedures, showDate } = props

	const medicationItem = _.find(procedures, ["id", id])
	const value = _.get(medicationItem, "procedureDate", "")


	const handleSelectDate = (e: React.ChangeEvent<HTMLInputElement>) => {
		const updatedProcedues = procedures.map(procedure => {
			if (procedure.id === id) {
				return { ...procedure, procedureDate: e.target.value }
			}
			return procedure
		})
		setProcedures(updatedProcedues)
	}

	if (showDate === false) return null

	return (
		<FormGroup
			id = "formPetDob"
			className = "mb-3"
			label = "Procedure Date"
			type = "date"
			onChange = {handleSelectDate}
			name = "dateOfBirth"
			value = {value || ""}
			required
		/>
	)
}
