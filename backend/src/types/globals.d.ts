declare global {
  type ServiceItem = {
	serviceAndCategoryListId: number
	serviceTime: string
	servicePrice: number
  }

  type DetailedServiceItem = ServiceItem & {
    categoryName: string
    serviceName: string
  }

  type OrganizationSpecialty = {
	specialtiesListId: number
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
    appointmentsId: number
    appointmentDate: MysqlTimestamp
    appointmentPrice: number
    patientMessage: string
    doctorConfirmationStatus: boolean
    createdAt: MysqlTimestamp
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
    instantBook: boolean
  }
}

export {}
