declare global {
  type ServiceItem = {
	service_and_category_listID: number
	serviceTime: string
	servicePrice: number
  }

  type DetailedServiceItem = ServiceItem & {
    categoryName: string
    serviceName: string
  }

  type OrganizationSpecialty = {
	specialties_listID: number
	organizationName: string
	specialtyName: string
  }

  type DoctorAvailability = {
    dayOfWeek: string
    startTime: string
    endTime: string
  }

  interface BasicPersonalInfo {
    FirstName: string
    LastName: string
  }

  type UserInfo = BasicPersonalInfo & {
    gender: string
    dateOfBirth: MysqlTimestamp
  }

  interface DashboardDataType {
    appointmentsID: number
    appointment_date: MysqlTimestamp
    appointment_price: number
    patient_message: string
    doctorConfirmationStatus: boolean
    created_at: MysqlTimestamp
    categoryName: string
    serviceName: string
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
