import { useState } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TailwindAccordion = ({ children } : {children: any}) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="border rounded-lg shadow-md overflow-hidden">
			{/* Header to toggle the accordion */}
			<button
				className="flex justify-between items-center p-4 bg-yellow-500 text-white font-semibold"
				onClick={() => setIsOpen(!isOpen)}
			>
        Addresses
				<span>{isOpen ? "-" : "+"}</span>
			</button>

			{/* Content part, which will open/close based on the state */}
			<div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"} overflow-hidden`}>
				{children}
			</div>
		</div>
	)
}

export default TailwindAccordion
