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
    routeName: 'admin-users',
    label: 'Admin List',
    icon: '<i class="fas fa-user-edit mr-2"></i>',
    action: 'VIEW_LIST_OF_ADMIN',
  },
]

export const productSubsidebarList: SubsideBarItemDetail[] = [
  {
    routeName: 'product',
    label: 'Product Detail',
    icon: '<i class="iconify mr-2" data-icon="feather:book-open"></i>',
    action: 'VIEW_LIST_OF_PRODUCT',
  },
  {
    routeName: 'product-create-product',
    label: 'Create Product',
    icon: '<i class="lnil lnil-pencil mr-2"></i>',
    action: 'CREATE_PRODUCT',
  },
  { isDivider: true },
  {
    routeName: 'product-package',
    label: 'Package Detail',
    icon: '<i class="iconify mr-2" data-icon="feather:book-open"></i>',
    action: 'VIEW_LIST_OF_PACKAGE',
  },
  {
    routeName: 'product-create-package',
    label: 'Create Package',
    icon: '<i class="lnil lnil-pencil mr-2"></i>',
    action: 'CREATE_PACKAGE',
  },
  { isDivider: true },
  {
    routeName: 'product-package-group',
    label: 'Package Group Detail',
    icon: '<i class="iconify mr-2" data-icon="feather:book-open"></i>',
    action: 'VIEW_LIST_OF_PACKAGE',
  },
  {
    routeName: 'product-create-package',
    label: 'Create Package Group',
    icon: '<i class="lnil lnil-pencil mr-2"></i>',
    action: 'CREATE_PACKAGE',
  },
]

export const studentSubsidebarList: SubsideBarItemDetail[] = [
  {
    routeName: 'student',
    label: 'Student Info',
    icon: '<i class="lnil lnil-users-alt mr-2"></i>',
    action: 'VIEW_LIST_OF_STUDENT',
  },
]

export const codeSubsidebarList: SubsideBarItemDetail[] = [
  {
    routeName: 'code',
    label: 'Redeem Management',
    icon: '<i class="iconify mr-2" data-icon="feather:gift"></i>',
    action: 'VIEW_LIST_OF_REDEEM',
  },
]

export const permissionSubsidebarList: SubsideBarItemDetail[] = [
  {
    routeName: 'permission-role',
    label: 'Roles Information',
    icon: '<i class="lnil lnil-books mr-2"></i>',
    action: 'VIEW_LIST_OF_ROLE',
  },
  {
    routeName: 'permission-role-create',
    label: 'Create Role',
    icon: '<i class="lnil lnil-books mr-2"></i>',
    action: 'CREATE_ROLE',
  },
  { isDivider: true },
  {
    routeName: 'permission-team',
    label: 'Team Information',
    icon: '<i class="lnil lnil-books mr-2"></i>',
    action: 'VIEW_LIST_OF_TEAM',
  },
  {
    routeName: 'permission-team-create',
    label: 'Create Team',
    icon: '<i class="lnil lnil-books mr-2"></i>',
    action: 'CREATE_TEAM',
  },
  { isDivider: true },
]
