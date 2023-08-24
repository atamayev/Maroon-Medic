import _ from "lodash"
import { Link } from "react-router-dom"
import Button from "../button"

interface Props {
  doctorData: DoctorData
}

export default function SingleDoctor(props: Props) {
	const { FirstName, LastName, NVI } = props.doctorData
	return (
		<div className="bg-white shadow-lg rounded-lg p-4 m-2 grid grid-cols-1 grid-rows-1">
			<div className="flex flex-col">
				<h2
					className="text-lg font-semibold mb-2"
				>
					Dr. {_.upperFirst(FirstName || "")} {_.upperFirst(LastName || "")}
				</h2>
				<Link
					to={`/vet/${NVI}`}
					className="text-white inline-block"
				>
					<Button
						colorClass="bg-orange-200"
						hoverClass="hover:bg-orange-300"
						className="font-bold py-2 px-4 rounded inline-block w-full"
						title={`Click Me! NVI: ${NVI}`}
						textColor="text-black"
					/>
				</Link>
			</div>
		</div>
	)
}
