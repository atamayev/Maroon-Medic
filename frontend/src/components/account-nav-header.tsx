import { Nav } from "react-bootstrap"
import { useLocation } from "react-router-dom"

interface Props {
  href: string,
  eventKey: string,
  title: string
}

export default function AccountNavHeader(props: Props) {
  const { href, eventKey, title } = props
  const location = useLocation()
  const isActive = location.pathname.startsWith(href)

  return (
    <Nav.Item>
      <Nav.Link href = {href} eventKey = {eventKey} active = {isActive}>
        {title}
      </Nav.Link>
    </Nav.Item>
  )
}
