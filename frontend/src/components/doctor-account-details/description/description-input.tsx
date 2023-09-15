import FormGroup from "src/components/form-group"

interface Props {
	description: string
	setDescription: React.Dispatch<React.SetStateAction<string>>
}

export default function DescriptionInput (props: Props) {
	const { description, setDescription } = props

	return (
		<FormGroup
			id = "Description"
			value = {description}
			onChange = {event => {setDescription(event.target.value)}}
			maxLength = {1000}
			as = "textarea"
			rows = {3}
		/>
	)
}
