import { PrivateSlot, Purchasable, StatusPackage } from '../enums/package.enum'
import { IProduct } from './product.interface'

export interface IPackage {
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
  createdAt?: Date
  updatedAt?: Date
  product?: IProduct
}
