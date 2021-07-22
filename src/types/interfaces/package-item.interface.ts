import { IPackageInfo } from './package.interface'
import { ITicketInfo } from './ticket.interface'

export interface StudentPackageItemResponse {
  id: number
  packageId: number
  package: IPackageInfo
  tickets: ITicketInfo[]
}
