import React from "react"

interface Props {
  as?: React.ElementType,
  className?: string,
  id?: string,
  label?: string,
  max?: string,
  maxLength?: number,
  name?: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  pattern?: string,
  placeholder?: string,
  required?: boolean,
  rows?: number,
  type?: string,
  value?: string,
  children?: React.ReactNode,
}

export default function FormGroup({
	as,
	className,
	id,
	label,
	max,
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
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const Component = as || "input"

	return (
		<div id = {id} className= {`mb-4 ${className}`}>
			{label && <label htmlFor = {id} className = "block text-sm font-medium text-gray-600">{label}</label>}
			<Component
				className ="mt-1 p-2 w-full border rounded-md text-gray-900"
				id = {id}
				max={max}
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
