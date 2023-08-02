declare global {
  interface DoctorDashboardDataType extends DashboardDataType {
    Patient_FirstName: string
    Patient_LastName: string
  }

  interface DoctorCalendarEventType {
    title: string
    start: Date
    end: Date
    Doctor_confirmation_status: boolean
  }

  type DoctorStatusType = {
    PubliclyAvailable: boolean
    Verified: boolean
  }

  type ServiceItemType = {
    service_and_category_listID: number
    Category_name: string
    Service_name: string
    Service_time: string
    Service_price: number
  }

  interface EducationType {
    School_name: string
    Education_type: string
    Start_Date: string
    End_Date: string
  }

  type EducationObjType = EducationType & {
    Major_name?: string
  }

  type PreVetEducationItemType = EducationType & {
    pre_vet_education_mappingID: number
    Major_name: string
  }

  type VetEducationItemType = EducationType & {
    vet_education_mappingID: number
  }

  type PicturesItemType = {
    picture_link: string
    picture_number: number
  }
}

export {}
