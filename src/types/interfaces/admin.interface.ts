import { AdminCountry, AdminStatus } from '../enums/admin.enum'
export interface IAdminAccessInfo {
  id: number
  name: string
}
export interface IUserInfo {
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
  firstname: string
  lastname: string
  avatar: string
  phone: string
  email: string
  teamName: string
  roleName: string
  country: AdminCountry
  manageCountry: string[]
  status: AdminStatus
}

export interface IAdminInfo {
  id: number
  name: string
  fullname: string
  firstname: string
  lastname: string
  avatar: string
  dob: string
  phone: string
  email: string
  status?: number
  lastLogin?: Date
  country: string
  manageCountry: string
  teamId: number
  teamName: string
  roleId: number
  roleName: string
}

export interface IFormAdminInfo {
  name: string
  firstname: string
  lastname: string
  avatar: string
  dob: string
  phone: string
  country: string
  manageCountry: string[]
}
