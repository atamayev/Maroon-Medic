import { Nav } from "react-bootstrap"
import AccountNavHeader from "../../components/account-nav-header"

export default function DoctorHeader() {
  return (
    <Nav justify variant = "pills" className = "justify-content-center">
      <AccountNavHeader
        href = "/vet-dashboard"
        eventKey = "link-1"
        title = "Dashboard"
      />
      <AccountNavHeader
        href = "/vet-calendar"
        eventKey = "link-2"
        title = "Calendar"
      />
      <AccountNavHeader
        href = "/vet-account-details"
        eventKey = "link-3"
        title = "Account Details"
      />
      <AccountNavHeader
        href = "/vet-settings"
        eventKey = "link-4"
        title = "Settings"
      />
    </Nav>
  )
}
