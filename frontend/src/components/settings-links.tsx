import { Link } from "react-router-dom"

interface Props {
  SettingsLink: string,
  title: string
}

export default function SettingsLinks(props: Props): JSX.Element {
  const { SettingsLink, title } = props

  return (
    <Link to={`${SettingsLink}`} className="block" style={{ textDecoration: "none" }}>
      <div className="border border-yellow-500 w-72 p-4 rounded mx-3">
        <h1 className="text-brown-800 text-lg no-underline">{title}</h1>
      </div>
    </Link>
  )
}
