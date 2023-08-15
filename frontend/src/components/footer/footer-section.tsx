import { MDBFooter, MDBContainer, MDBRow } from "mdb-react-ui-kit"
import "../styles/footer.css"
import { LeftFooterColumn } from "./left-footer-column"
import { CenterFooterColumn } from "./center-footer-column"
import { RightFooterColumn } from "./right-footer-column"
import { BottomFooterColumn } from "./bottom-footer-column"

export default function Footer() {
  return (
    <MDBFooter style = {{ backgroundColor: "rgb(51, 51, 51)" }} className = "align-items-center justify-content-center layout-container">
      <MDBContainer className = "text-center text-md-start mt-5 w-100">
        <MDBRow className = "mt-3">
          <LeftFooterColumn />

          <CenterFooterColumn />

          <RightFooterColumn />
        </MDBRow>
      </MDBContainer>

      <BottomFooterColumn />
    </MDBFooter>
  )
}
