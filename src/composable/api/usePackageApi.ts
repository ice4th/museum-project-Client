import { checkResponseStatus } from '.'
import useApi, { ApiResponse } from '../useApi'
import {
  IPaginationParams,
  IPaginationResponse,
} from '/@src/types/interfaces/common.interface'
import {
  IFormPackageInfo,
  IPackageTableInfo,
  IPackageGroupInfo,
  ICreatePackageGroup,
  IPackageDetail,
} from '/@src/types/interfaces/package.interface'

export default function usePackageApi() {
  const api = useApi()

  const getPackageById = async (id: number): Promise<IPackageDetail> => {
    const res = await api.get<IPackageDetail>(`/Packages/${id}`)
    return checkResponseStatus(res) || undefined
  }

  const getPackagesWithPagination = async (
    params: IPaginationParams
  ): Promise<IPaginationResponse<IPackageTableInfo[]>> => {
    const res = await api.get<IPaginationResponse<IPackageTableInfo[]>>(
      `/Packages`,
      { params }
    )
    return checkResponseStatus(res) || []
  }

  const getAllPackagesGroup = async (): Promise<IPackageGroupInfo[]> => {
    const res = await api.get<IPackageGroupInfo[]>(`/PackageGroups`)
    return checkResponseStatus(res) || []
  }

  const getAddonPackageByMainPackageId = async (
    packageId: number
  ): Promise<IPackageGroupInfo[]> => {
    const res = await api.get<IPackageGroupInfo[]>(
      `/PackageGroups/Packages/${packageId}`
    )
    return checkResponseStatus(res) || []
  }

  const createPackage = async (payload: IFormPackageInfo) => {
    return await api.post<any, ApiResponse>('Packages', {
      ...payload,
      installmentMonth: parseInt(`${payload.installmentMonth || '0'}`),
      purchasable: payload.purchasable ? '1' : '0',
      status: +payload.status,
    })
  }

  const createPackageGroup = async (payload: ICreatePackageGroup) => {
    return await api.post<any, ApiResponse>(`/PackageGroups`, payload)
  }

  const updatePackageGroup = async (payload: ICreatePackageGroup) => {
    return await api.put<any, ApiResponse>(`/PackageGroups`, payload)
  }

  const updatePackage = async (payload: IFormPackageInfo) => {
    return await api.put<any, ApiResponse>(`/Packages/${payload.packageId}`, {
      ...payload,
      installmentMonth: parseInt(`${payload.installmentMonth || '0'}`),
      purchasable: payload.purchasable ? '1' : '0',
      status: +payload.status,
    })
  }

  // remove alll package in group by main package
  const deletePackageGroupByMainPackageId = async (packageId: number) => {
    return await api.delete<any, ApiResponse>(
      `/PackageGroups/Packages/${packageId}`
    )
  }

  // remove package by addon package **cannot remove main package
  const deleteAddonPackageGroupById = async (packageGroupId: number) => {
    return await api.delete<any, ApiResponse>(
      `/PackageGroups/${packageGroupId}`
    )
  }

  return {
    getPackageById,
    getPackagesWithPagination,
    getAllPackagesGroup,
    getAddonPackageByMainPackageId,
    createPackage,
    createPackageGroup,
    updatePackage,
    updatePackageGroup,
    deletePackageGroupByMainPackageId,
    deleteAddonPackageGroupById,
  }
}
