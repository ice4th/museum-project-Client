import { IPackage } from '../types/interfaces/package.interface'
import ApiService, { ApiServiceResponse } from './api.service'
// import { IAllAnnouncement } from '@/types/interfaces/announcement.interface'

export default class PackageService {
  public static async getAllPackages(): Promise<
    ApiServiceResponse<IPackage[]>
  > {
    return await ApiService.get<IPackage[]>(`/Package`)
  }
}
