import logo from "../../images/logo.svg"

const handleHome = () => {
	sessionStorage.setItem("searchTerm", "")
	window.location.href = "/"
}

export default function Logo () {
	return (
		<div className="w-1/4 flex justify-start">
			<img
				src = {logo}
				alt = "Logo"
				width = {50}
				height = {50}
				onClick = {handleHome}
				style = {{ cursor: "pointer" }}
				className = "mr-2"
			/>
		</div>
	)
}
