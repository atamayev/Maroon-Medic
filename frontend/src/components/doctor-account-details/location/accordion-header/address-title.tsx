interface Props {
  address: DoctorAddressData
  index: number
}

const AddressTitle = (props: Props) => {
  const {address, index} = props

  if (address.address_title) return <>{address.address_title}</>
  return <>{("Address #" + (index + 1))}</>
}

export default AddressTitle
