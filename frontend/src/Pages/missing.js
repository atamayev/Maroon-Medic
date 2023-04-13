import Header from "./header"

export default function Missing () {
    return (
        <>
            <Header dropdown = {true} search = {true} className = "d-flex align-items-center justify-content-center w-100"/>
            <article style={{ padding: "100px" }}>
                <h1>Oops!</h1>
                <p>Page Not Found</p>
                <a href = "/">Visit Our Homepage</a>
            </article>
        </>
    )
}
