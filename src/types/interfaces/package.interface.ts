import {
  GenerateTicket,
  PrivateSlot,
  Purchasable,
  StatusPackage,
} from '../enums/package.enum'
import { IProduct } from './product.interface'

export interface IPackageInfo {
  id: number
  packageName: string
  productId: number
  detail: string
  comment: string
  accessLevel: string
  price: number
  beforeDiscount: number
  duration: number
  ticket: number
  freetalkTicket?: number
  fmcId: number
  status: StatusPackage
  country: string
  purchasable: Purchasable
  photo: string
  priority: number
  curriculumSheet: string
  type: string
  engder: string
  pepTalkTicket?: number
  installmentMonth: number
  groupClassTicket?: number
  masterClassTicket?: number
  nameInternal: string
  curriculumId: number
  cefr: string
  globishLevel: string
  featureGroupId?: number
  privateSlot: PrivateSlot
  courseId: number
  createdAt?: string
  updatedAt?: string
  product?: IProduct
}

export interface TPackageInfo {
  id: number
  packageName: string
  detail: string
  comment: string
  accessLevel: string
  price: number
  beforeDiscount: number
  duration: number
  ticket: number
  freetalkTicket?: number
  fmcId: number
  status: StatusPackage
  country: string
  purchasable: Purchasable
  photo: string
  priority: number
  curriculumSheet: string
  type: string
  engder: string
  pepTalkTicket?: number
  installmentMonth: number
  groupClassTicket?: number
  masterClassTicket?: number
  nameInternal: string
  curriculumId: number
  cefr: string
  globishLevel: string
  featureGroupId?: number
  privateSlot: PrivateSlot
  courseId: number
}

export interface IPackageGroupInfo {
  id: number
  isMainPackage: boolean
  packageId: number
  addonPackageId: number
  generateTicket: GenerateTicket
  idx: number
  dependonPackageId: number
  dependonTicketUse: number
  packageInfo: TPackageInfo
}

export interface ICreateAddonPackage {
  packageId: number
  generateTicket: GenerateTicket
  idx: number
  dependonPackageId?: number
  dependonTicketUse?: number
}

export interface IUpdateAddonPackage {
  packageGroupId?: number
  packageId: number
  generateTicket: GenerateTicket
  idx: number
  dependonPackageId?: number
  dependonTicketUse?: number
}

export interface ICreatePackageGroup {
  mainPackageId: number
  addonPackages: IUpdateAddonPackage[] // include main package
}

export interface ICratePackageForm {
  packageName: string
  packageNameInternal?: string
  productId: number
  purchasable: boolean
  status: '0' | '1'
  detail?: string
  comment?: string
  globishLevel: string
  cefrLevel: string
  price?: number
  beforeDiscount?: number
  installmentMonth?: string
  engder?: string
  type: string
  duration?: number
  ticketOneOnOne?: number
  ticketFreetalk?: number
  ticketGroup?: number
  ticketMaster?: number
  photo?: string
  curriculumSheet?: string
  curriculumId?: number
  featureGroupId?: number
  findMycoachId?: number
  moocCourseId?: number
  privateSlot?: number
}

export interface ICratePackage {
  packageName: string
  packageNameInternal?: string
  productId: number
  purchasable: Purchasable
  status: StatusPackage
  detail?: string
  comment?: string
  globishLevel: string
  cefrLevel: string
  price: number
  beforeDiscount: number
  installmentMonth: number
  engder?: string
  type: string
  duration?: number
  ticketOneOnOne?: number
  ticketFreetalk?: number
  ticketGroup?: number
  ticketMaster?: number
  photo?: string
  curriculumSheet?: string
  curriculumId?: number
  featureGroupId?: number
  findMycoachId?: number
  moocCourseId?: number
  privateSlot?: number
}

export interface IUseCratePackageForm {
  products: any[]
  curriculums: any[]
  featureGroups: any[]
  fmcPackages: any[]
  moocCourses: any[]
  createPackageForm: ICratePackageForm
}
