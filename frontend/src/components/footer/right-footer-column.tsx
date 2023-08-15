import { MDBCol } from "mdb-react-ui-kit"

export const RightFooterColumn = () => {
  return (
    <MDBCol md = "2" lg = "2" xl = "2" className = "mx-auto mb-4 text-white">
      <h6 className = "fw-bold mb-4">Are you a top veterinarian?</h6>
      <p>
        <a href = "/vet-register" className = "text-reset" style = {{ textDecoration: "none" }}>
          List your practice on MaroonMedic
        </a>
      </p>
    </MDBCol>
  )
}
