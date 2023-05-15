import React from 'react'
import {Accordion } from 'react-bootstrap'

export default function _Accordion({
    eventKey, 
    header, 
    body
}) {

  return (
    <Accordion.Item eventKey = {eventKey}>
    <Accordion.Header>{header}</Accordion.Header>
      {/* possibly: {accountDetails.Location.index.name}{accountDetails.Location.index.name} */}

    <Accordion.Body>
      {body}
    </Accordion.Body>
  </Accordion.Item>
  )
}
