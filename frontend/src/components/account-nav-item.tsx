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
	if (isActive) classes = "bg-blue-300 border-blue-700"
	else classes = "bg-white border-blue-500 hover:bg-blue-700 hover:text-white"

	return (
		<div className = "inline-flex items-center justify-center flex-grow flex-shrink">
			<Link
				to = {to}
				className = "font-bold text-center w-full"
			>
				<div className={`rounded text-black border px-2 py-2  ${classes}`}>
					{label}
				</div>
			</Link>
		</div>
	)
}

export default PillItem
