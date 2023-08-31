import { Link, useLocation } from "react-router-dom"

type PillItemProps = {
	label: string
	to: string
	image: string
	imageAlt?: string
}

export default function PillItem (props: PillItemProps) {
	const { label, to, image, imageAlt } = props
	const location = useLocation()
	const isActive = location.pathname.startsWith(to)

	let classes
	if (isActive) classes = "bg-orange-200 border-orange-300"
	else classes = "bg-white border-orange-200 hover:bg-orange-300"

	return (
		<div className = "inline-flex items-center justify-center flex-grow flex-shrink">
			<Link
				to = {to}
				className = "font-bold text-center w-full"
			>
				<div className = {`rounded text-black border p-2 transition-all duration-100 ${classes}`}>
					<span>
						{imageAlt}
					</span>
					{" "} {label} {""}
					<span>
						{image}
					</span>
				</div>
			</Link>
		</div>
	)
}
