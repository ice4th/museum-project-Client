import { TicketType } from '../enums/ticket.enum'

export interface IStudentPackageItems {
  packageItemId: number
  packageId: number
  packageName: string
  packageImage: string
  tickets: ITicketPackageItems[]
  studentId?: number
}
export interface ITicketPackageItems {
  type: TicketType
  remain: number
  startDate?: Date
  expireDate: Date
}
export interface StudentPackageItemResponse {
  inactivePackages: IStudentPackageItems[]
  activePackages: IStudentPackageItems[]
  expirePackages: IStudentPackageItems[]
}

export interface IRedeemPackageStudent {
  code: string
  studentId: number
}

export interface IAddPackageStudent {
  comment: string
  packageId: number
  studentId?: number
  startDate?: string | null
}
