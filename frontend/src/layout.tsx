import Header from "./components/header/header"
import Footer from "./components/footer/footer"

interface Props {
  showHeader: boolean
  children: React.ReactNode
  search: boolean
  dropdown: boolean
}

const Layout = (props: Props) => {
	const { showHeader, children, search, dropdown } = props

	return (
		<>
			<div className="flex min-h-min justify-center" style={{ minHeight: "80.75vh" }}>
				<div className="w-5/6" style={{ maxWidth: "4000px" }}>
					{showHeader &&
						<Header
							search={search}
							dropdown={dropdown}
						/>
					}
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
