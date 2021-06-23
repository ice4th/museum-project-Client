import { ProductType } from '../enums/product.enum'

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
