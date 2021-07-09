import { RedeemStatus, RedeemType } from '../enums/redeem.enum'
import { IPackageInfo } from './package.interface'

export interface IRedeemDetail {
  id: number
  code?: string
  type: RedeemType
  packageName: string
  partnerName: string
  studentId?: number
  studentName?: string
  packageItmeId?: number
  status: RedeemStatus
  usedDate?: string
  ticketStartDate?: string
  expireDate?: string
}

export interface ICreateRedeem {
  redeemType: RedeemType
  partnerId: number
  packageId: number
  ticketStartDate?: string
  expireDate?: string
  amount?: number // for redeem type group
}
