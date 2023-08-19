import logo from "../../images/logo.svg"

const handleHome = () => {
  sessionStorage.setItem("searchTerm", "")
  window.location.href = "/"
}

const Logo = () => {
  return (
    <div className="w-1/4">
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

export default Logo
