import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import "../styles/footer.css"

export default function Footer() {
  const renderLeftFooterColumn = () => {
    return (
      <MDBCol md = "3" lg = "4" xl = "3" className = 'mx-auto mb-4'>
        <h6 className = 'fw-bold mb-4 text-white'> MaroonMedic </h6>
        <p>
          <a href = '/' className = 'link' style = {{ textDecoration: 'none' }}>Home</a>
        </p>
        <p>
          <a href = '/about' className = 'link' style = {{ textDecoration: 'none' }}>About Us</a>
        </p>
        <p>
          <a href = '/help' className = 'link' style = {{ textDecoration: 'none' }}>Help</a>
        </p>
      </MDBCol>
    )
  }

  const renderCenterFooterColumn = () => {
    return (
      <MDBCol md = "4" lg = "3" xl = "3" className = 'mx-auto mb-md-0 mb-4 text-white'>
        <h6 className = 'text-uppercase fw-bold mb-4'>Contact</h6>
        <p>New York, NY</p>
        <p>MaroonMedic@gmail.com</p>
        <p>(929) 483-6894</p>
      </MDBCol>
    )
  }

  const renderRightFooterColumn = () => {
    return (
      <MDBCol md = "2" lg = "2" xl = "2" className = 'mx-auto mb-4 text-white'>
        <h6 className = 'fw-bold mb-4'>Are you a top veterinarian?</h6>
        <p>
          <a href = '/vet-register' className = 'text-reset' style = {{ textDecoration: 'none' }}>
            List your practice on MaroonMedic
          </a>
        </p>
      </MDBCol>
    )
  }

  const renderBottomFooterColumn = () => {
    return (
      <div className = 'text-center p-4 text-white' style = {{ backgroundColor: 'rgb(0, 0, 0)' }}>
      Copyright © {new Date().getFullYear()}
        <a  href = "/" className = 'text-reset fw-bold' style = {{ textDecoration: 'none' }}> MaroonMedic</a>
      </div>
    )
  }

  return (
    <MDBFooter style = {{ backgroundColor: 'rgb(51, 51, 51)' }}>
        <MDBContainer className = 'text-center text-md-start mt-5 w-100'>
          <MDBRow className = 'mt-3'>
            {renderLeftFooterColumn()}

            {renderCenterFooterColumn()}

            {renderRightFooterColumn()}
          </MDBRow>
        </MDBContainer>

      {renderBottomFooterColumn()}
    </MDBFooter>
  );
}
