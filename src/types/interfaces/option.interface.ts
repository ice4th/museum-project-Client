export interface ProductOption {
  id: number
  name: string
  type: string
}

export interface PackageOption {
  id: number
  packageName: string
  ticket: number
  photo: string
  packageCurriculum?: string
}

export interface PartnerOption {
  id: number
  partnerName: string
  phone: string
  email: string
}

export interface MoocOption {
  id: number
  title: string
  category: string
  author: string
}

export interface CurriculumOption {
  id: number
  name: string
  studentMaterial: string
}

export interface FeatureGroupOption {
  id: number
  name: string
  numberOfActiveUser: number
}

export interface FindMyCoachOption {
  id: number
  packageName: string
  ticket: number
}

export interface TeamOption {
  id: number
  name: string
}
