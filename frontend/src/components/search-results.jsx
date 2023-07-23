import SingleDoctor from "./single-doctor-search-result"

export default function SearchResults(props) {
  const { data } = props
  return (
    <div className = "card-container" style = {{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: "16px" }}>
      {data.map((item) => {
        return <SingleDoctor key = {item.NVI} doctorData = {item} />
      })}
    </div>
  )
}
