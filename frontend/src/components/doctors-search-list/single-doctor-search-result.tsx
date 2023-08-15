import _ from "lodash"
import { Link } from "react-router-dom"

type DoctorData = {
  NVI: number,
  FirstName: string,
  LastName: string,
}

interface Props {
  doctorData: DoctorData
}

export default function SingleDoctor(props: Props) {
  const { FirstName, LastName, NVI } = props.doctorData
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-2 grid grid-cols-1 grid-rows-1">
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold mb-2">Dr. {_.upperFirst(FirstName || "")} {_.upperFirst(LastName || "")}</h2>
        <Link to={`/vet/${NVI}`} className="text-white">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <p>Click Me! NVI: {NVI}</p>
          </button>
        </Link>
      </div>
    </div>
  )
}
