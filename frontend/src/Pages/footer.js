import React from 'react';
import "../styles/footer.css"
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    // <MDBFooter className='text-center text-lg-start text-muted text-white rounded-3 w-100' style={{ backgroundColor: 'rgb(51, 51, 51)' }}>
    <MDBFooter style={{ backgroundColor: 'rgb(51, 51, 51)' }}>
      <section>
        <MDBContainer className='text-center text-md-start mt-5 w-100'>
          <MDBRow className='mt-3'>
            
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'  >
              <h6 className='fw-bold mb-4 text-white' >
                MaroonMedic
              </h6>
              <p>
                <a href='/' className='link' style={{ textDecoration: 'none' }}>
                  Home
                </a>
              </p>
              <p>
                <a href='/about' className='link' style={{ textDecoration: 'none' }}>
                  About Us
                </a>
              </p>
              <p>
                <a href='/help' className='link' style={{ textDecoration: 'none' }}>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4 text-white'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                New York, NY 
              </p>
              <p>
                MaroonMedic@gmail.com
              </p>
              <p>
                (929) 483-6894
              </p>
              <p>
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4 text-white'>
              <h6 className='fw-bold mb-4'>Are you a top veterinarian?</h6>
              <p>
                <a href='/vet-register' className='text-reset' style={{ textDecoration: 'none' }}>
                  List your practice on MaroonMedic
                </a>
              </p>

            </MDBCol>
           
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4 text-white' style={{ backgroundColor: 'rgb(0, 0, 0)' }}>
      Copyright © {new Date().getFullYear()}
        <a  href = "/" className='text-reset fw-bold' style={{ textDecoration: 'none' }}> MaroonMedic</a>
      </div>
    </MDBFooter>
  );
}
