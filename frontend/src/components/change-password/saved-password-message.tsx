export default function SavedPasswordMessage ({ message }: { message: string }) {
	if (!message) return null

	let alertClass = "px-4 py-3 rounded relative mt-3 mb-0"

	if (message === "Password changed successfully") {
		alertClass += " bg-green-100 border border-green-400 text-green-700"
	} else {
		alertClass += " bg-red-100 border border-red-400 text-red-700"
	}

	return (
		<div className={alertClass}>
			{message}
		</div>
	)
}
