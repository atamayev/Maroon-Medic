import { Routes, Route } from "react-router-dom"
import routes from "./routes"
import Layout from "./layout"

export default function App() {
	return (
		<Routes>
			{routes.map((route, index) => (
				<Route
					key = {index}
					path = {route.path}
					element = {
						<Layout
							showHeader={route.showHeader}
							search={route.search}
							dropdown={route.dropdown}
						>
							<route.component />
						</Layout>
					}
				/>
			))}
		</Routes>
	)
}
