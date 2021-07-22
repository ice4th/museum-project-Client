import { checkResponseStatus } from '.'
import useApi from '../useApi'
import {
  IPaginationParams,
  IPaginationResponse,
} from '/@src/types/interfaces/common.interface'
import {
  IPackageTableInfo,
  IPackageGroupInfo,
  ICreatePackageGroup,
} from '/@src/types/interfaces/package.interface'

export default function useAuthApi() {
  const api = useApi()

  const getAllPackages = async (
    params: IPaginationParams
  ): Promise<IPackageTableInfo[] | null> => {
    const res = await api.get<IPackageTableInfo[]>(`/Packages`, { params })
    return checkResponseStatus(res)
  }

  const getPackagesWithPagination = async (
    params: IPaginationParams
  ): Promise<IPaginationResponse<IPackageTableInfo[]> | null> => {
    const res = await api.get<IPaginationResponse<IPackageTableInfo[]>>(
      `/Packages`,
      { params }
    )
    return checkResponseStatus(res)
  }

  const getAllPackagesGroup = async (): Promise<IPackageGroupInfo[] | null> => {
    const res = await api.get<IPackageGroupInfo[]>(`/PackageGroups`)
    return checkResponseStatus(res)
  }

  const getAddonPackageByMainPackageId = async (
    packageId: number
  ): Promise<IPackageGroupInfo[] | null> => {
    const res = await api.get<IPackageGroupInfo[]>(
      `/PackageGroups/Packages/${packageId}`
    )
    return checkResponseStatus(res)
  }

  const createPackageGroup = async (payload: ICreatePackageGroup) => {
    return await api.post(`/PackageGroups`, payload)
  }

  const updatePackageGroup = async (payload: ICreatePackageGroup) => {
    return await api.put(`/PackageGroups`, payload)
  }

  // remove alll package in group by main package
  const deletePackageGroupByMainPackageId = async (packageId: number) => {
    return await api.delete(`/PackageGroups/Packages/${packageId}`)
  }

  // remove package by addon package **cannot remove main package
  const deleteAddonPackageGroupById = async (packageGroupId: number) => {
    return await api.delete(`/PackageGroups/${packageGroupId}`)
  }

  return {
    getAllPackages,
    getPackagesWithPagination,
    getAllPackagesGroup,
    getAddonPackageByMainPackageId,
    createPackageGroup,
    updatePackageGroup,
    deletePackageGroupByMainPackageId,
    deleteAddonPackageGroupById,
  }
}
