import Header from "./components/header/header"
import Footer from "./components/footer/footer"

interface Props {
  showHeader: boolean
  children: React.ReactNode
  search: boolean
  dropdown: boolean
}

function Layout (props: Props) {
	const { showHeader, children, search, dropdown } = props

	return (
		<>
			{showHeader && <Header search={search} dropdown={dropdown} />}
			<div className="flex min-h-min justify-center" style={{ minHeight: "80.75vh" }}>
				<div className="w-5/6" style={{ maxWidth: "4000px" }}>
					<div>
						{children}
					</div>
				</div>
			</div>
			<Footer />
		</>
	)

}

export default Layout
