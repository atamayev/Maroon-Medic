declare global {
  type PersonalDataType = {
    FirstName: string
    LastName: string
    Gender: string
    NVI: number
  }

  type ServiceType = {
    service_and_category_listID: number
    Category_name: string
    Service_name: string
    Service_time: string
    Service_price: number
  }

  type AddressType = {
    address_priority: number
    addressesID: number
    address_title: string
    address_line_1: string
    address_line_2: string
    city: string
    state: string
    zip: string
    country: string
    instant_book: boolean
    phone_priority: number
    phone: string
    times: TimeType[]
  }

  interface TimeType {
    Day_of_week: string
    Start_time: string
    End_time: string
  }
}

export {}
