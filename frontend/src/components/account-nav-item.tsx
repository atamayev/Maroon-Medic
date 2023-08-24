import { Link, useLocation } from "react-router-dom"

type PillItemProps = {
  label: string
  to: string
}

const PillItem = (props: PillItemProps) => {
	const { label, to } = props
	const location = useLocation()
	const isActive = location.pathname.startsWith(to)

	let classes
	if (isActive) classes = "bg-orange-200 border-orange-400"
	else classes = "bg-white border-orange-400 hover:bg-orange-300"

	return (
		<div className = "inline-flex items-center justify-center flex-grow flex-shrink">
			<Link
				to = {to}
				className = "font-bold text-center w-full"
			>
				<div className = {`rounded text-black border p-2 transition-all duration-100 ${classes}`}>
					{label}
				</div>
			</Link>
		</div>
	)
}

export default PillItem
