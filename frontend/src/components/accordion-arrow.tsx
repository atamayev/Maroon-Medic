interface Props {
	isOpen: boolean
}

export default function AccordionArrow(props: Props) {
	const { isOpen } = props

	if (isOpen === true) return (
		<div>V</div>
	)
	return (
		<div>^</div>
	)
}
