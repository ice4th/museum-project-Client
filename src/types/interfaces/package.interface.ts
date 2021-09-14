import {
  GenerateTicket,
  PackageType,
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

export interface ICurriculumInfo {
  id: number
  name: string
  internalName: string
  type: string
  detail: string
  lesson: number
  level: string
  used: number
  coachMaterial: string
  studentMaterial: string
}

export interface IPackageDetail {
  id: number
  packageName: string
  packageNameInternal?: string
  detail: string
  nameInternal: string
  comment: string
  accessLevel: string
  price: number
  beforeDiscount: number
  duration: number
  ticket: number
  freeTalkTicket: number
  fmcId: number
  status: StatusPackage
  country: string
  purchasable: Purchasable
  photo: string
  curriculumSheet: string
  type: string
  engder: string
  installmentMonth: number
  groupClassTicket?: number
  masterClassTicket?: number
  curriculumId: number
  cefrLevel?: string
  globishLevel: string
  featureGroupId?: number
  privateSlot: PrivateSlot
  courseId: number
  curriculumInfo: ICurriculumInfo
  productInfo: IProduct
}

export interface IPackageTableInfo {
  id: number
  packageName: string
  type: string
  productName: string
  productType: string
  globishLevel: string
  curriculumUrl: string
  purchasable: Purchasable
  ticket: number
  freeTalkTicket: number
  groupClassTicket: number
  duration: number
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

export interface IPackageAddonDetail {
  id: number
  packageId: number
  packageName: string
  type: PackageType
  purchasable: Purchasable
  duration: number
  price: number
}
export interface IPackageGroupTable {
  id: number
  packageId: number
  packageName: string
  type: PackageType
  purchasable: Purchasable
  price: number
  duration: number
  generateTicket: GenerateTicket
  subPackages: IPackageAddonDetail[]
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
  packageName?: string
  packageTicket?: number
}

export interface ICreatePackageGroup {
  mainPackageId: number
  addonPackages: IUpdateAddonPackage[] // include main package
}

export interface IFormPackageInfo {
  packageId?: number
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
  loadingOptions: boolean
  loadingPackage: boolean
  notFoundPackage: boolean
  formPackageInfo: IFormPackageInfo
}
