import _ from "lodash"
import SingleDoctor from "./single-doctor-search-result"

type DoctorData = {
  NVI: number,
  FirstName: string,
  LastName: string,
}

interface Props {
  data: DoctorData[]
}

export default function SearchResults( { data } : { data: DoctorData[] }) {
  if (_.isEmpty(data)) return <p> Loading... </p>

  return (
    <div className = "card-container" style = {{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: "16px" }}>
      {data.map((item) => {
        return <SingleDoctor key = {item.NVI} doctorData = {item} />
      })}
    </div>
  )
}
