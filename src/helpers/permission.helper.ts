import { IAdminAccessInfo } from '../types/interfaces/admin.interface'

export interface NavbarItemDetail {
  key: string
  label: string
  icon: string
}
export type navListKey = 'admin' | 'student' | 'product' | 'code'
export const navbarList = [
  { key: 'admin', label: 'Admin', icon: 'feather:users' },
  { key: 'student', label: 'Students', icon: 'feather:users' },
  { key: 'product', label: 'Products & Packages', icon: 'feather:box' },
  { key: 'code', label: 'Code Management', icon: 'feather:gift ' },
] as NavbarItemDetail[]

export const listOfMainMenuByPermission = (menus: IAdminAccessInfo[]) => {
  return navbarList.filter((navbar) =>
    menus.some((menu) => menu.name === navbar.label)
  )
}
