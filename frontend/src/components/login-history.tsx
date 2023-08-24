export default function LoginHistory(
	{ loginHistoryItem } :
  {loginHistoryItem: { Login_at: string } }
) {
	return (
		<div className="mb-3 p-2 rounded border border-amber-500 bg-yellow-100">
			<h1 className="text-brown-800 text-lg">Login Time: {loginHistoryItem.Login_at}</h1>
		</div>
	)
}
