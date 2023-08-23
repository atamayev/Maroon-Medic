import { Link } from "react-router-dom"

const LeftFooterColumn = () => {
  return (
    <div className="md:w-1/4 lg:w-1/3 xl:w-1/4 mx-auto mb-4">
      <h6 className="font-bold mb-4 text-yellow-400"> MaroonMedic </h6>
      <p>
        <a href="/" className="text-amber-400 underline">Home</a>
      </p>
      <p>
        <Link to ="/about" className="text-amber-400 underline">About Us</Link>
      </p>
      <p>
        <Link to="/help" className="text-amber-400 underline">Help</Link>
      </p>
    </div>
  )
}

export default LeftFooterColumn
