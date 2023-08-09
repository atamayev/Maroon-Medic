declare global {
  interface DoctorDashboardData extends DashboardDataType {
    Patient_FirstName: string
    Patient_LastName: string
  }

  interface DoctorCalendarEvent {
    title: string
    start: Date
    end: Date
    Doctor_confirmation_status: boolean
  }

  type ServiceItem = {
    service_and_category_listID: number
    Service_time: string
    Service_price: number
    Category_name: string
    Service_name: string
  }

  interface EducationBase {
    School_name: string
    Education_type: string
    Start_Date: string
    End_Date: string
  }

  type GeneralEducationItem = EducationBase & {
    Major_name?: string
  }

  type PreVetEducationItem = EducationBase & {
    pre_vet_education_mappingID: number
    Major_name: string
  }

  type VetEducationItem = EducationBase & {
    vet_education_mappingID: number
  }

  type PicturesItem = {
    picture_link: string
    picture_number: number
  }
}

export {}
