import { IAdminInfo } from './admin.interface'

export interface IMenu {
  id: number
  name: string
  subMenus: ISubMenu[]
}

export interface ISubMenu {
  id: number
  name: string
  actions?: IPermission[]
  permissions: IPermission[]
}

export interface IPermission {
  id: number
  name: string
  description: string
  actionName: string
  mainMenu?: string
  mainMenuId?: number
  subMenu?: string
  subMenuId?: number
  selected?: boolean
}

export interface ISaveRolePayload {
  teamId: number
  name: string
  description: string
  permissionIds: number[]
}

export interface IEditRolePayload extends ISaveRolePayload {
  id: number
}

export interface IRoleInfo {
  id: number
  name: string
  description: string
  permissions?: IPermission[]
  users?: IAdminInfo[]
  team?: ITeamDetail
  teamId?: number
}

export interface IDeleteRole {
  teamId: number
  roleId: number
}

export interface ISelectedMenuItem {
  name: string
  icon: string
  actions: number
  subtitles: number
  subMenus: {
    name: string
    actions: {
      id: number
      name: string
    }[]
  }[]
}

export interface ITeamDetail {
  id: number
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
}
export interface ITeamInfo {
  id: number
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  admins: IMemberInfo
}

export interface IMemberInfo {
  id: number
  name: string
  fullname: string
  firstname: string
  lastname: string
  avatar: string
  dob: Date
  phone: string
  email: string
  country: string
  manageCountry: string
  teamId: number
  teamName: string
  roleId: number
  roleName: string
}

export interface ITeamData {
  name: string
  description: string
}

export interface ITeamCreate {
  name: string
  description: string
}
