import { GlobishLevel, PackageCefrLevel } from '../enums/package.enum'
import { ProductCEFR, ProductType, Purchasable } from '../enums/product.enum'

export interface IProduct {
  id: number
  name: string
  type: ProductType
  slug: string

  body?: string
  bodyDraft?: string

  detail: string
  price: number
  beforeDiscount: number
  duration: number
  order: number
  productOrder: number
  excerpt: string
  cefr: PackageCefrLevel
  globishLevel?: GlobishLevel
  image?: string
  level?: string

  metaDescription?: string
  metaKeyword?: string
  metaTitle?: string
  seoFooter?: string

  preTestId?: number
  midTestId?: number
  postTestId?: number

  purchasable: Purchasable
  recommend1?: number
  recommend2?: number
  recommend3?: number

  status?: string
  createdAt: string
  updatedAt: string
}

export interface ICreateProduct {
  name: string
  excerpt: string
  body?: string
  purchasable?: Purchasable
  type?: ProductType
  cefr?: ProductCEFR
  slug: string
  order?: number
  price?: number
  beforeDiscount?: number
  duration?: number
  image?: string
  globishLevel?: GlobishLevel

  /**
   * SEO Section
   */
  metaTitle?: string
  metaKeyword?: string
  metaDescription?: string
  seoFooter?: string

  /**
   * Product Recommend
   */
  recommend1?: number
  recommend2?: number
  recommend3?: number

  /**
   * Assessment
   */
  preTestId?: number
  midTestId?: number
  postTestId?: number
}

export interface IUpdateProduct extends ICreateProduct {
  isPublish: boolean
}
