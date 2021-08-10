export interface IMenu {
  id: number
  name: string
  subMenus: ISubMenu[]
}

export interface ISubMenu {
  id: number
  name: string
  permissions: IPermission[]
}

export interface IPermission {
  id: number
  name: string
  description: string
  actionName: string
}

export interface ICreateRolePayload {
  teamId: number
  name: string
  description: string
  permissionIds: number[]
}

export interface IRoleInfo {
  id: number
  name: string
  description: string
  teamId: number
  teamName: string
}

export interface IDeleteRole {
  teamId: number
  roleId: number
}
