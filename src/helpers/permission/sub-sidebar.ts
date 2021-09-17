import { SubsideBarItemDetail } from './sidebar.interface'
/**
 * @Example for icon
 * @Iconify
 *    <i class="iconify mr-2" data-icon="feather:users"></i>
 * @lineIconLight
 *    <i class="lnil lnil-air-flow mr-2"></i>
 * @lineIconRegular
 *    <i class="lnir lnir-air-flow mr-2"></i>
 * @fontAwesome
 *    <i class="fas fa-user-edit mr-2"></i>
 */

export const adminSubsidebarList: SubsideBarItemDetail[] = [
  {
    routeName: 'admin',
    label: 'Admin List',
    icon: '<i class="fas fa-user-edit mr-2"></i>',
    action: 'VIEW_LIST_OF_ADMIN',
  },
]

export const productSubsidebarList: SubsideBarItemDetail[] = [
  {
    routeName: 'products',
    label: 'Product Detail',
    icon: '<i class="iconify mr-2" data-icon="feather:book-open"></i>',
    action: 'VIEW_LIST_OF_PRODUCT',
  },
  {
    routeName: 'products-create',
    label: 'Create Product',
    icon: '<i class="lnil lnil-pencil mr-2"></i>',
    action: 'CREATE_PRODUCT',
  },
  { isDivider: true },
  {
    routeName: 'products-packages',
    label: 'Package Detail',
    icon: '<i class="iconify mr-2" data-icon="feather:book-open"></i>',
    action: 'VIEW_LIST_OF_PACKAGE',
  },
  // {
  //   routeName: 'products-packages-create',
  //   label: 'Create Package',
  //   icon: '<i class="lnil lnil-pencil mr-2"></i>',
  //   action: 'CREATE_PACKAGE',
  // },
  { isDivider: true },
  {
    routeName: 'products-packages-groups',
    label: 'Package Group Detail',
    icon: '<i class="iconify mr-2" data-icon="feather:book-open"></i>',
    action: 'VIEW_LIST_OF_PACKAGE',
  },
  {
    routeName: 'products-packages-groups-create',
    label: 'Create Package Group',
    icon: '<i class="lnil lnil-pencil mr-2"></i>',
    action: 'CREATE_PACKAGE',
  },
]

export const studentSubsidebarList: SubsideBarItemDetail[] = [
  {
    routeName: 'students',
    label: 'Student Info',
    icon: '<i class="lnil lnil-users-alt mr-2"></i>',
    action: 'VIEW_LIST_OF_STUDENT',
  },
]

export const codeSubsidebarList: SubsideBarItemDetail[] = [
  {
    routeName: 'codes-redeems',
    label: 'Redeem Management',
    icon: '<i class="iconify mr-2" data-icon="feather:gift"></i>',
    action: 'VIEW_LIST_OF_REDEEM',
  },
]

export const permissionSubsidebarList: SubsideBarItemDetail[] = [
  {
    routeName: 'permissions-roles',
    label: 'Roles Information',
    icon: '<i class="lnil lnil-books mr-2"></i>',
    action: 'VIEW_LIST_OF_ROLE',
  },
  {
    routeName: 'permissions-roles-create',
    label: 'Create Role',
    icon: '<i class="lnil lnil-books mr-2"></i>',
    action: 'CREATE_ROLE',
  },
  { isDivider: true },
  {
    routeName: 'permissions-teams',
    label: 'Team Information',
    icon: '<i class="lnil lnil-books mr-2"></i>',
    action: 'VIEW_LIST_OF_TEAM',
  },
  {
    routeName: 'permissions-teams-create',
    label: 'Create Team',
    icon: '<i class="lnil lnil-books mr-2"></i>',
    action: 'CREATE_TEAM',
  },
  { isDivider: true },
]
