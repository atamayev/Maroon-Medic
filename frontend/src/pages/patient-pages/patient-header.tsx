import { Nav } from "react-bootstrap"
import AccountNavHeader from "../../components/account-nav-header"

export default function PatientHeader() {
  return (
    <Nav justify variant = "pills" className = "justify-content-center">
      <AccountNavHeader
        href = "/dashboard"
        eventKey = "link-1"
        title = "Dashboard"
      />
      <AccountNavHeader
        href = "/my-pets"
        eventKey = "link-2"
        title = "My Pets"
      />
      <AccountNavHeader
        href = "/account-details"
        eventKey = "link-3"
        title = "Account Details"
      />
      <AccountNavHeader
        href = "/settings"
        eventKey = "link-4"
        title = "Settings"
      />
    </Nav>
  )
}
