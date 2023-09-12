interface Props {
	title: string
	content: JSX.Element
}

export default function AccountDetailsCard (props: Props) {
	const { title, content } = props
	return (
		<div className="bg-zinc-100 border border-brown-400 rounded p-4 mb-3">
			<div className="bg-zinc-200 rounded border-b border-brown-400 pb-2 text-brown-800">
				<div className="ml-2">
					{title}
				</div>
			</div>
			<div className="pt-4">
				{content}
			</div>
		</div>
	)
}
