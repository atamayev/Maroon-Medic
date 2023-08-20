interface Props {
  description: string
  isDescriptionOverLimit: boolean
}

const DescriptionCharacterLimit = (props: Props) => {
  const { description, isDescriptionOverLimit } = props

  const counterStyleLimit = () => {
    if (isDescriptionOverLimit) return {color: "red"}
    return {color: "black"}
  }

  return (
    <div style = {counterStyleLimit()}>
      Character Limit: {description.length} / 1000
    </div>
  )
}

export default DescriptionCharacterLimit
