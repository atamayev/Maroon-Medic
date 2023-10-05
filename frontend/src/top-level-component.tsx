import { useMemo } from "react"
import AppContext , { MaroonContext } from "./contexts/maroon-context"

export default function TopLevelComponent ({ children } : { children: React.ReactNode }) {
	const sharedState = useMemo(() => new MaroonContext(), [])

	return (
		<AppContext.Provider value = {sharedState}>
			{children}
		</AppContext.Provider>
	)
}
