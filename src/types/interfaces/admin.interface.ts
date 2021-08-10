import { AdminStatus } from '../enums/admin.enum'

export interface IAdminInfo {
  id: number
  name: string
  email: string
  firstname: string
  lastname: string
  status: AdminStatus
  avatar: string
  phone: string
  dob: string
  lastLogin: string
  roleId: number
  teamId: number
}
