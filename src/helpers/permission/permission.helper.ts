import {
  adminSubsidebarList,
  codeSubsidebarList,
  productSubsidebarList,
  permissionSubsidebarList,
  studentSubsidebarList,
} from '.'
import { IAdminAccessInfo } from '../../types/interfaces/admin.interface'
import { mainSidebar } from './main-sidebar'
import { NavbarKey, SubsideBarItemDetail } from './sidebar.interface'

export const listOfMainMenuByPermission = (menus: IAdminAccessInfo[]) => {
  return mainSidebar.filter((navbar) =>
    menus.some((menu) => menu.name === navbar.label)
  )
}

export const listOfSubSideMenu = (key: NavbarKey): SubsideBarItemDetail[] => {
  switch (key) {
    case NavbarKey.ADMIN:
      return adminSubsidebarList
    case NavbarKey.STUDENT:
      return studentSubsidebarList
    case NavbarKey.PRODUCT:
      return productSubsidebarList
    case NavbarKey.CODE:
      return codeSubsidebarList
    case NavbarKey.PERMISSION:
      return permissionSubsidebarList

    default:
      return []
  }
}

export const subsidebarByPermission = (
  key: NavbarKey,
  permissions: string[]
) => {
  return listOfSubSideMenu(key).filter(
    (subsidebar) =>
      subsidebar.isDivider ||
      permissions.some((permission) => permission === subsidebar.action)
  )
}
