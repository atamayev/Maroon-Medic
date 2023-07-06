import { Form } from 'react-bootstrap'

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
  children  // New prop for options
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
        pattern = {pattern}
        placeholder = {placeholder}
        required = {required}
        rows = {rows}
        type = {type}
        value = {value}
      >
        {children}
        {/* // Render specific options (like select) in children*/}
      </Form.Control>
    </Form.Group>
  )
}
