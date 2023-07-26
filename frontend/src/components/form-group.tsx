import React from "react"
import { Form } from "react-bootstrap"

interface Props {
  as?: React.ElementType,
  className?: string,
  defaultValue?: string,
  id?: string,
  label?: string,
  maxLength?: number,
  name?: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  pattern?: string,
  placeholder?: string,
  required?: boolean,
  rows?: number,
  type?: string,
  value?: string,
  children?: React.ReactNode
}

export default function FormGroup({
  as,
  className,
  defaultValue,
  id,
  label,
  maxLength,
  name,
  onChange,
  pattern,
  placeholder,
  required,
  rows,
  type,
  value,
  children
}: Props) {

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
        pattern = {pattern}
        placeholder = {placeholder}
        required = {required}
        rows = {rows}
        type = {type}
        value = {value}
      >
        {children}
      </Form.Control>
    </Form.Group>
  )
}
