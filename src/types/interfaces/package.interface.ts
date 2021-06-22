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
  addonPackages: ICreateAddonPackage[] // include main package
}
