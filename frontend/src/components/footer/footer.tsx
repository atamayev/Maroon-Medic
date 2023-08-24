import LeftFooterColumn from "./left-footer-column"
import CenterFooterColumn from "./center-footer-column"
import RightFooterColumn from "./right-footer-column"
import BottomFooterRow from "./bottom-footer-row"

export default function Footer() {
	return (
		<footer className="bg-gray-700 align-items-center justify-center">
			<div className="text-center text-md-start mt-5 w-full">
				<div className="mt-3 flex flex-wrap">
					<LeftFooterColumn />

					<CenterFooterColumn />

					<RightFooterColumn />
				</div>
			</div>

			<BottomFooterRow />
		</footer>
	)
}
