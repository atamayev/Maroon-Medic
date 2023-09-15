import _ from "lodash"
import { useState, useEffect } from "react"

interface Props {
	description: string
}

export default function DescriptionCharacterLimit (props: Props) {
	const { description } = props
	const [isDescriptionOverLimit, setIsDescriptionOverLimit] = useState(false)

	useEffect(() => {
		if (description || description === "") {
			setIsDescriptionOverLimit(description.length >= 1000)
		}
	}, [description])

	const counterStyleLimit = () => {
		if (isDescriptionOverLimit) return {color: "red"}
		return {color: "black"}
	}

	if (_.isNull(description)) return null

	return (
		<div style = {counterStyleLimit()}>
			Character Limit: {description.length} / 1000
		</div>
	)
}
