import { AdminCountry, AdminStatus } from '../enums/admin.enum'
export interface IAdminAccessInfo {
  id: number
  name: string
}
export interface IAdminInfo {
  id: number
  roleName: string
  teamName: string
  name: string
  email: string
  firstname: string
  lastname: string
  status: AdminStatus
  avatar: string
  phone: string
  dob: string
  lastLogin: string
  country: AdminCountry
  manageCountry: AdminCountry[]
  menus: IAdminAccessInfo[]
  permissions: string[]
}

export interface IAdminDetail {
  id: number
  name: string
  fullname: string
  avatar: string
  phone: string
  email: string
  teamName: string
  roleName: string
  country: AdminCountry
  status: AdminStatus
}
