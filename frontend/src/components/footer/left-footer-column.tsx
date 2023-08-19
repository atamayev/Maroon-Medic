import { MDBCol } from "mdb-react-ui-kit"

const LeftFooterColumn = () => {
  return (
    <MDBCol md = "3" lg = "4" xl = "3" className = "mx-auto mb-4">
      <h6 className = "fw-bold mb-4 text-white"> MaroonMedic </h6>
      <p>
        <a href = "/" className = "link" style = {{ textDecoration: "none" }}>Home</a>
      </p>
      <p>
        <a href = "/about" className = "link" style = {{ textDecoration: "none" }}>About Us</a>
      </p>
      <p>
        <a href = "/help" className = "link" style = {{ textDecoration: "none" }}>Help</a>
      </p>
    </MDBCol>
  )
}

export default LeftFooterColumn
