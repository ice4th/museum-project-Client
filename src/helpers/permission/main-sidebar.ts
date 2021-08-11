import { NavbarItemDetail } from './sidebar.interface'

export const mainSidebar: NavbarItemDetail[] = [
  { key: 'admin', label: 'Admin', icon: 'feather:users' },
  { key: 'student', label: 'Students', icon: 'feather:users' },
  { key: 'product', label: 'Products & Packages', icon: 'feather:box' },
  {
    key: 'permission-role',
    label: 'Roles & Permissions',
    icon: 'feather:unlock',
  },
  { key: 'code', label: 'Code Management', icon: 'feather:gift ' },
]
