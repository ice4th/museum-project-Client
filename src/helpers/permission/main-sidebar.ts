import { NavbarItemDetail } from './sidebar.interface'

export const mainSidebar: NavbarItemDetail[] = [
  { key: 'admin', label: 'Admin', icon: 'feather:users' },
  {
    key: 'permission',
    label: 'Roles & Permissions',
    icon: 'feather:unlock',
  },
  { key: 'student', label: 'Students', icon: 'feather:users' },
  { key: 'product', label: 'Products & Packages', icon: 'feather:box' },
  { key: 'code', label: 'Code', icon: 'feather:gift' },
]
