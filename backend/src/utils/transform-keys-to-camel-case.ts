/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from "lodash"

// Convert snake_case to camelCase for a string
const toCamelCase = (str: string): string => _.camelCase(str)

// Convert snake_case keys to camelCase keys for an object
export const transformKeysToCamelCase = (obj: { [key: string]: any }): { [key: string]: any } => {
	return _.mapKeys(obj, (value, key) => toCamelCase(key))
}

export const transformArrayOfObjectsToCamelCase = (array: Array<{ [key: string]: any }>): Array<{ [key: string]: any }> => {
	return array.map(obj => transformKeysToCamelCase(obj))
}
