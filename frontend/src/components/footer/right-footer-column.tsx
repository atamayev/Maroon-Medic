import { Link } from "react-router-dom"

const RightFooterColumn = () => {
	return (
		<div className="md:w-1/6 lg:w-1/6 xl:w-1/6 mx-auto mb-4 text-white">
			<h6 className="font-bold mb-4 text-green-600">Are you a top veterinarian?</h6>
			<p>
				<Link to ="/vet-register" className="text-reset text-amber-400 underline">
          List your practice on MaroonMedic
				</Link>
			</p>
		</div>
	)
}

export default RightFooterColumn
