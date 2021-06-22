import {
  ICreatePackageGroup,
  IPackageInfo,
} from '../types/interfaces/package.interface'
import ApiService, { ApiServiceResponse } from './api.service'
export default class PackageService {
  public static async getAllPackages(): Promise<
    ApiServiceResponse<IPackageInfo[]>
  > {
    return await ApiService.get<IPackageInfo[]>(`/Package`)
  }

  public static async createPackageGroup(
    payload: ICreatePackageGroup
  ): Promise<ApiServiceResponse<IPackageInfo[]>> {
    return await ApiService.post(`/PackageGroup`, payload)
  }
}
