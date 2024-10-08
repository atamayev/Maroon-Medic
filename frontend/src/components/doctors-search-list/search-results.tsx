import _ from "lodash"
import SingleDoctor from "./single-doctor-search-result"

export default function SearchResults( { data } : { data: DoctorData[] }) {
	if (_.isEmpty(data)) return <p> Loading... </p>

	return (
		<div className = "card-container" style = {{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: "16px" }}>
			{data.map((item) => {
				return <SingleDoctor key = {item.nvi} doctorData = {item} />
			})}
		</div>
	)
}
