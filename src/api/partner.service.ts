/**
 * PartnerService about admin profile service
 */
import { IPartnerDetail } from '../types/interfaces/partner.interface'
import ApiService, { ApiServiceResponse } from './api.service'

export default class PartnerService {
  public static async getAllPartner(): Promise<
    ApiServiceResponse<IPartnerDetail[]>
  > {
    return await ApiService.get<IPartnerDetail[]>('/Partners')
  }
}
