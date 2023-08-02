declare global {
  type MysqlTimestamp = string
  type PersonalDataType = {
    FirstName: string
    LastName: string
    Gender: string
    NVI: number
  }

  type PersonalInfoType = {
    FirstName: string,
    LastName: string,
    DOB_month: string,
    DOB_day: number,
    DOB_year: number,
    Gender: string
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
    phone: string
    times: AvailabilityData[]
  }

  interface AvailabilityData {
    Day_of_week: string
    Start_time: string
    End_time: string
  }

  type DoctorOrPatient = "Doctor" | "Patient"
  type DoctorOrPatientOrNull = DoctorOrPatient | null
  type VetOrPatient = "Vet" | "Patient"

  type LanguageItemType = {
    language_listID: number
    Language_name: string
  }

  type ServiceItemType = {
    service_and_category_listID: number
    Category_name: string
    Service_name: string
    Service_time: string
    Service_price: number
  }

  type ServiceListItemType = {
    service_and_category_listID: number
    Category_name: string
    Service_name: string
  }

  type SpecialtyItemType = {
    specialties_listID: number
    Organization_name: string
    Specialty_name: string
  }

  type EducationObjType = {
    School_name: string
    Education_type: string
    Start_Date: string
    End_Date: string
    Major_name?: string
  }

  type PreVetEducationItemType = {
    pre_vet_education_mappingID: number
    School_name: string
    Major_name: string
    Education_type: string
    Start_Date: string
    End_Date: string
  }

  type VetEducationItemType = {
    vet_education_mappingID: number
    School_name: string
    Education_type: string
    Start_Date: string
    End_Date: string
  }

  type TimeStateType = {
    startMonth: string
    startYear: string
    endMonth: string
    endYear: string
  }

  type DoctorAddressDataType = {
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
    address_public_status: boolean
    phones: PhoneDataType[]
    times: AvailabilityDataType[]
  }

  type PhoneDataType = {
    Phone: string
  }

  type AvailabilityDataType = {
    Day_of_week: DayOfWeekType
    Start_time: string
    End_time: string
  }

  type ServicedPetItemType = {
    pet_listID: number
    Pet: string
    Pet_type: string
  }

  type PreVetSchoolType = {
    pre_vet_school_listID: number
    School_name: string
  }

  type MajorType = {
    major_listID: number
    Major_name: string
  }

  type PreVetEducationTypeType = {
    pre_vet_education_typeID: number
    Education_type: string
  }

  type VetSchoolListType = {
    vet_school_listID: number
    School_name: string
  }

  type VetEducationTypeType = {
    vet_education_typeID: number
    Education_type: string
  }

  type InsuranceItemType = {
    insurance_listID: number
    Insurance_name: string
  }

  type DoctorStatusType = {
    PubliclyAvailable: boolean
    Verified: boolean
  }

  type PicturesItemType = {
    picture_link: string
    picture_number: number
  }

  type PersonalData = {
    FirstName: string
    LastName: string
    Gender: string
  }

  type PetItemType = {
    Name: string
    Gender: string
    DOB: string
    Pet: string
    Pet_type: string
    pet_infoID: number
    insuranceName: string
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

  interface PatientDashboardDataType extends DashboardDataType {
    Doctor_FirstName: string
    Doctor_LastName: string
  }

  interface DoctorDashboardDataType extends DashboardDataType {
    Patient_FirstName: string
    Patient_LastName: string
  }

  type ConfirmationMessage = {
    messageType: "saved" | "same" | "problem" | "none" | null,
    timeoutId?: number | null
  }

  interface DoctorListDetailsType {
    languages: LanguageItemType[]
    servicesAndCategories: ServiceListItemType[]
    specialties: SpecialtyItemType[]
    preVetSchools: PreVetSchoolType[]
    preVetEducationTypes: PreVetEducationTypeType[]
    majors: MajorType[]
    vetSchools: VetSchoolListType[]
    vetEducationTypes: VetEducationTypeType[]
    pets: ServicedPetItemType[]
  }

  interface PatientListDetailsType {
    LanguagesList: LanguageItemType[]
  }

  interface DoctorCalendarEventType {
    title: string
    start: Date
    end: Date
    Doctor_confirmation_status: boolean
  }

  type DeleteStatusesDictionary = {
    [key: number]: DeleteStatusesType;
  };

  type DeleteStatusesType = "deleting" | "initial"

  type DeleteButtonDataTypes = LanguageItemType | SpecialtyItemType | PreVetEducationItemType | VetEducationItemType

  type DayOfWeekType = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"

  type AppointmentStatusType = "approved" | "pending" | "confirming"

  interface LoginAndRegisterInformationType {
    loginType: DoctorOrPatient
    email: string
    password: string
  }

  interface ChangePasswordObject {
    userType: DoctorOrPatient
    currentPassword: string
    newPassword: string
    newConfirmPassword: string
  }
}

export {}
