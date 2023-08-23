import React from "react"

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
  const Component = as || "input"

  return (
    <div id = {id} className= {`mb-4 ${className}`}>
      {label && <label htmlFor = {id} className = "block text-sm font-medium text-gray-600">{label}</label>}
      <Component
        className ="mt-1 p-2 w-full border rounded-md text-gray-900"
        defaultValue = {defaultValue}
        id = {id}
        maxLength = {maxLength}
        name = {name}
        onChange = {onChange}
        pattern = {pattern}
        placeholder = {placeholder}
        required = {required}
        rows = {rows}
        type = {type || "text"}
        value = {value}
      >
        {children}
      </Component>
    </div>
  )
}
