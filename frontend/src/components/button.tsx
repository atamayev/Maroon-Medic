/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
	title: string
	disabled?: boolean
	onClick?: (e: any) => void | Promise<void>
	className?: string
	colorClass: string
	hoverClass: string
	textColor?: string
}

export default function Button (props: Props) {
	let backgroundColor
	let hoverColor
	let textColor
	if (props.disabled) {
		backgroundColor = "bg-gray-400"
		hoverColor = ""
	} else {
		backgroundColor = props.colorClass || "bg-black"
		hoverColor = props.hoverClass || ""
	}
	if (props.textColor) textColor = props.textColor

	const css = `transition-all duration-100 rounded p-2 ${backgroundColor} ${hoverColor} ${textColor} ${props.className}`

	return (
		<button
			type = {props.onClick ? "button" : "submit"}
			className = {css}
			onClick = {props.onClick}
			disabled = {props.disabled ?? false}
		>
			{props.title}
		</button>
	)
}
