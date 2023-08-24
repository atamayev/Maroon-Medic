import { Link } from "react-router-dom"

interface Props {
  SettingsLink: string,
  title: string
}

export default function SettingsLinks(props: Props): JSX.Element {
	const { SettingsLink, title } = props

	return (
		<Link to = {`${SettingsLink}`}
			className = "block border border-yellow-500 w-80 p-2 rounded mx-3"
			style = {{ textDecoration: "none" }}
		>
			<h1 className = "text-brown-800 text-lg no-underline">{title}</h1>
		</Link>
	)
}
