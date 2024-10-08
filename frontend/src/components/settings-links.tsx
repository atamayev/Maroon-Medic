import { Link } from "react-router-dom"

interface Props {
  settingsLink: string,
  title: string
}

export default function SettingsLinks(props: Props): JSX.Element {
	const { settingsLink, title } = props

	return (
		<Link to = {`${settingsLink}`}
			className = "font-bold text-center w-full block border border-yellow-500 w-80 p-2 rounded mx-3 \
				transition-all duration-100 hover:bg-amber-300"
			style = {{ textDecoration: "none" }}
		>
			<h1 className = "text-brown-800 text-lg no-underline">{title}</h1>
		</Link>
	)
}
