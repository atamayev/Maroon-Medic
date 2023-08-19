import _ from "lodash"

export default function shouldSaveDescription(savedDescriptionData: string, description: string): boolean {
  if (_.isEmpty(savedDescriptionData) && _.isEmpty(description)) return false
  if (!savedDescriptionData || _.isEmpty(savedDescriptionData)) return !_.isEmpty(description)
  return description !== savedDescriptionData
}
