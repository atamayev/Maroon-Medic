import React from 'react'
import {Form } from 'react-bootstrap'

export default function FormGroup({
  as,
  className,
  defaultValue,
  id,
  label,
  maxLength,
  name,
  onChange,
  placeholder,
  required,
  rows,
  type,
  value
}) {

  return (
    <Form.Group id = {id} className = {className}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as = {as}
        defaultValue = {defaultValue}
        id = {id}
        maxLength = {maxLength}
        name = {name}
        onChange = {onChange}
        placeholder= {placeholder}
        required = {required}
        rows = {rows}
        type = {type}
        value = {value}
      />
    </Form.Group>
  )
}
