export type navListKey = 'admin' | 'student' | 'product' | 'code'

export enum NavbarKey {
  INDEX = 'index',
  ADMIN = 'admin',
  STUDENT = 'student',
  PRODUCT = 'product',
  CODE = 'code',
}
export interface NavbarItemDetail {
  key: string
  label: string
  icon: string
}
export interface SubsideBarItemDetail {
  routeName?: string
  label?: string
  icon?: string
  action?: string
  isDivider?: Boolean
}
