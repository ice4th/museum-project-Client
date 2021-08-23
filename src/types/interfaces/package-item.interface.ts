import { TicketType } from '../enums/ticket.enum'

export interface IStudentPackageItems {
  packageItemId: number
  packageId: number
  packageName: string
  packageImage: string
  studentId?: number
  tickets: ITicketPackageItems[]
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
