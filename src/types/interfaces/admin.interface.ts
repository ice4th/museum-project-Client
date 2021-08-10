import { AdminCountry, AdminStatus } from '../enums/admin.enum'
import { ISubmenuActionName } from './permission.interface'
export interface IAdminAccessInfo {
  id: number
  name: string
  subMenus?: ISubmenuActionName[]
}
export interface IAdminInfo {
  id: number
  roleId: number
  teamId: number
  name: string
  email: string
  firstname: string
  lastname: string
  status: AdminStatus
  avatar: string
  phone: string
  dob: Date
  lastLogin: Date
  country: AdminCountry
  manageCountry: AdminCountry[]
  menus: IAdminAccessInfo[]
}

export interface IAdminDetail {
  id: number
  name: string
  fullname: string
  avatar: string
  phone: string
  email: string
  country: AdminCountry
  status: AdminStatus
}
