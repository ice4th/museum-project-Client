import { GlobishLevel } from '../enums/package.enum'
import { ProductCEFR, ProductType, Purchasable } from '../enums/product.enum'

export interface IProduct {
  id: number
  name: string
  slug?: string
  type?: ProductType
  level?: string
  status: string
  productOrder: number
  globishLevel?: string
  preTestId?: number
  midTestId?: number
  postTestId?: number
  detail: string
  image: string
  body: string
  cefr: string
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
