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
  teamId: number
  teamName: string
  permissions?: IPermission[]
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
