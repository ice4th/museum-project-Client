import { checkResponseStatus } from '.'
import useApi, { apiHandleError, ApiResponse } from '../useApi'
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
  IPackageGroupTable,
} from '/@src/types/interfaces/package.interface'

export default function usePackageApi() {
  const api = useApi()
  const { catchReponse } = apiHandleError()

  const getPackageById = async (id: number): Promise<IPackageDetail> => {
    const res = await api.get<IPackageDetail, ApiResponse>(`/Packages/${id}`)
    return catchReponse(res)
  }

  const getPackagesWithPagination = async (
    params: IPaginationParams
  ): Promise<IPaginationResponse<IPackageTableInfo[]>> => {
    const res = await api.get<
      IPaginationResponse<IPackageTableInfo[]>,
      ApiResponse
    >(`/Packages`, { params })
    return catchReponse(res) || []
  }

  const getAllPackagesGroup = async (
    params: IPaginationParams
  ): Promise<IPaginationResponse<IPackageGroupTable[]>> => {
    const res = await api.get<
      IPaginationResponse<IPackageGroupTable[]>,
      ApiResponse
    >(`/PackageGroups`, { params })
    return catchReponse(res) || []
  }

  const getAddonPackageByMainPackageId = async (
    packageId: number
  ): Promise<IPackageGroupInfo[]> => {
    const res = await api.get<IPackageGroupInfo[], ApiResponse>(
      `/PackageGroups/Packages/${packageId}`
    )
    return catchReponse(res) || []
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
