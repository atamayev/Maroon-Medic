declare global {
  type ServiceItem = {
    service_and_category_listID: number
    Service_time: string
    Service_price: number
  }

  type ServiceItemType = ServiceItem & {
    Category_name: string
    Service_name: string
  }

  type SpecialtyItemType = {
    specialties_listID: number
    Organization_name: string
    Specialty_name: string
  }

  type AvailabilityDataType = {
    Day_of_week: string
    Start_time: string
    End_time: string
  }

  interface BasicPersonalInfo {
    FirstName: string
    LastName: string
  }

  type BasicUserInfo = BasicPersonalInfo & {
    Gender: string
    DOB: MysqlTimestamp
  }

  interface DashboardDataType {
    appointmentsID: number
    appointment_date: MysqlTimestamp
    appointment_price: number
    patient_message: string
    Doctor_confirmation_status: boolean
    Created_at: MysqlTimestamp
    Category_name: string
    Service_name: string
    address_title: string
    address_line_1: string
    address_line_2: string
    city: string
    state: string
    zip: string
    country: string
  }

  type AddressData = {
    addressesID: number
    address_priority: number
    address_title: string
    address_line_1: string
    address_line_2: string
    city: string
    state: string
    zip: string
    country: string
    instant_book: boolean
  }
}

export {}
