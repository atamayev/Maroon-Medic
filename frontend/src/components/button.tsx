/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
	title: string
  disabled?: boolean
  onClick?: (e: any) => void | Promise<void>
  className?: string
  colorClass: string
	hoverClass: string
}

export default function Button (props: Props) {
  let backgroundColor
  let hoverColor
  if (props.disabled) {
    backgroundColor = "bg-gray-400"
    hoverColor = ""
  } else {
    backgroundColor = props.colorClass || "bg-black"
    hoverColor = props.hoverClass || ""
  }
  const css = `transition-all duration-200 rounded-lg p-2 ${backgroundColor} ${hoverColor} text-white ${props.className}`

  return (
    <button
      type = {props.onClick ? "button" : "submit"}
      className = {css}
      onClick = {props.onClick}
      disabled = {props.disabled ?? false}
    >
      {props.title}
    </button>
  )
}
