import { Link } from "react-router-dom"
import Button from "src/components/button"

export default function PersonalInfoLinkSection() {
	return (
		<div className="mb-3 p-4 border rounded shadow">
      Looking to edit your Profile Information? {""}
			<Link to="/settings/personal-information">
				<Button
					className="p-1"
					colorClass="bg-green-600"
					hoverClass="hover:bg-green-700"
					title="Edit Personal Information"
				/>
			</Link>
		</div>
	)
}
