import React from 'react'
import {Card} from 'react-bootstrap'
import {Link} from "react-router-dom";

export default function SettingsLinks(props) {
  return (
    <Link to = {`${props.SettingsLink}`} style={{ textDecoration: 'none' }}>
      <Card border="primary" style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  )
}
