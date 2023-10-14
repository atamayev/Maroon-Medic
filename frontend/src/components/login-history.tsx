interface Props {
	loginHistoryItem: { loginAt: string }
}

export default function LoginHistory(props: Props) {
	const { loginHistoryItem } = props

	return (
		<div className="mb-3 p-2 rounded border border-amber-500 bg-yellow-100">
			<h1 className="text-brown-800 text-lg">
				Login Time: {loginHistoryItem.loginAt}
			</h1>
		</div>
	)
}
