import React from 'react'
import {Form } from 'react-bootstrap'

export default function FormGroup({
  id, 
  label, 
  defaultValue, 
  onChange, 
  type, 
  placeholder, 
  required,
  as, 
  rows, 
  maxLength,
  value
}) {

  return (
    <Form.Group id={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        id={id}
        defaultValue={defaultValue}
        onChange={onChange}
        type = {type}
        placeholder= {placeholder}
        required = {required}
        as = {as}
        rows = {rows}
        maxLength = {maxLength}
        value = {value}
      />
    </Form.Group>
  )
}
