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
    firstName: string
    lastName: string
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
    addressTitle: string
    addressLine1: string
    addressLine2: string
    city: string
    state: string
    zip: string
    country: string
  }

  type AddressData = {
    addressesId: number
    addressPriority: number
    addressTitle: string
    addressLine1: string
    addressLine2: string
    city: string
    state: string
    zip: string
    country: string
    instantBook: boolean
  }
}

export {}
