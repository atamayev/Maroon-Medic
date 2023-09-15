import { Link } from "react-router-dom"
import Button from "src/components/button"

export default function PersonalInfoLinkSection() {
	return (
		<div className="mb-3 p-4 border rounded shadow">
			Looking to edit your Profile Information? {""}
			<Link to="/settings/personal-information">
				<Button
					className = "p-1 font-mediums"
					colorClass = "bg-green-700"
					hoverClass = "hover:bg-green-800"
					title = "Edit Personal Information"
					textColor = "text-white"
				/>
			</Link>
		</div>
	)
}
