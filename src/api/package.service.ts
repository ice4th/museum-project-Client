import {
  ICreatePackageGroup,
  IPackageGroupInfo,
  IPackageInfo,
} from '../types/interfaces/package.interface'
import ApiService, { ApiServiceResponse } from './api.service'
export default class PackageService {
  public static async getAllPackages(): Promise<
    ApiServiceResponse<IPackageInfo[]>
  > {
    return await ApiService.get<IPackageInfo[]>(`/Packages`)
  }

  public static async getAllPackagesGroup(): Promise<
    ApiServiceResponse<IPackageGroupInfo[]>
  > {
    return await ApiService.get<IPackageGroupInfo[]>(`/PackageGroups`)
  }

  public static async getAddonPackageByMainPackageId(
    packageId: number
  ): Promise<ApiServiceResponse<IPackageGroupInfo[]>> {
    return await ApiService.get<IPackageGroupInfo[]>(
      `/PackageGroups/Packages/${packageId}`
    )
  }

  public static async createPackageGroup(
    payload: ICreatePackageGroup
  ): Promise<ApiServiceResponse<IPackageInfo[]>> {
    return await ApiService.post(`/PackageGroups`, payload)
  }

  public static async updatePackageGroup(
    payload: ICreatePackageGroup
  ): Promise<ApiServiceResponse<IPackageInfo[]>> {
    return await ApiService.put(`/PackageGroups`, payload)
  }

  // remove alll package in group by main package
  public static async deletePackageGroupByMainPackageId(
    packageId: number
  ): Promise<ApiServiceResponse<IPackageInfo[]>> {
    return await ApiService.delete(`/PackageGroups/Packages/${packageId}`)
  }

  // remove package by addon package **cannot remove main package
  public static async deleteAddonPackageGroupById(
    packageGroupId: number
  ): Promise<ApiServiceResponse<IPackageInfo[]>> {
    return await ApiService.delete(`/PackageGroups/${packageGroupId}`)
  }
}
