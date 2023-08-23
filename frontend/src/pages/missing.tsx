import { Link } from "react-router-dom"
import Header from "../components/header/header"

export default function Missing () {
  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <article style = {{ padding: "100px" }}>
        <h1>Oops!</h1>
        <p>Page Not Found</p>
        <Link to = "/">Visit Our Homepage</Link>
      </article>
    </>
  )
}
