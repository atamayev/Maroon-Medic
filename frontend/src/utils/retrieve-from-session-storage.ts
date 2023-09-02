// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function retrieveFromSessionStorage(key: string): any {
	const storedData = sessionStorage.getItem(key)
	const parsedData = storedData && JSON.parse(storedData)
	return parsedData
}
