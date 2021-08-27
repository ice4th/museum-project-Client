import useApi, { apiHandleError, ApiResponse } from '../useApi'
import useUserSession from '../useUserSession'
import {
  IPaginationParams,
  IPaginationResponse,
} from '/@src/types/interfaces/common.interface'
import {
  IRedeemPackageStudent,
  StudentPackageItemResponse,
} from '/@src/types/interfaces/package-item.interface'
import {
  IStudentList,
  IUpdateStudentProfile,
  IStudentInfo,
} from '/@src/types/interfaces/student.interface'
import {
  IAddTicketStudent,
  IStartTicketStudent,
  IExpireTicketStudent,
  IDeleteTicketPayload,
} from '/@src/types/interfaces/ticket.interface'

export default function useStudentApi() {
  const api = useApi()
  const { catchReponse } = apiHandleError()
  const { user: adminProfile } = useUserSession()

  const getStudentInfoById = async (
    studentId: number
  ): Promise<IStudentInfo | undefined> => {
    const res = await api.get<IStudentInfo, ApiResponse>(
      `/Students/Info/${studentId}`
    )
    return catchReponse(res)
  }

  const getAllStudents = async (
    params: IPaginationParams,
    search?: string
  ): Promise<IPaginationResponse<IStudentList[]>> => {
    const res = await api.get<IPaginationResponse<IStudentList[]>, ApiResponse>(
      `/Students/Info/All`,
      { params: { ...params, search } }
    )
    return catchReponse(res)
  }

  const updateStudentInfoById = async (
    studentId: number,
    payload: IUpdateStudentProfile
  ) => {
    const res = await api.put<IStudentInfo, ApiResponse>(
      `/Students/Info/${studentId}`,
      payload
    )
    return res
  }

  const getStudentPackageItems = async (
    studentId: number
  ): Promise<StudentPackageItemResponse | null> => {
    const res = await api.get<StudentPackageItemResponse, ApiResponse>(
      `/Students/${studentId}/Packages`
    )
    return catchReponse(res)
  }

  const addNewTicketStudent = async (payload: IAddTicketStudent) => {
    const res = await api.post<any, ApiResponse>(
      `/Tickets/${payload.packageItemId}/Add`,
      payload
    )
    return res
  }

  const activatePackageItemById = async (
    packageItemId: number,
    payload: { startDate?: string }
  ) => {
    return await api.post<any, ApiResponse>(
      `/PackageItems/${packageItemId}/Activate`,
      payload
    )
  }

  const changeStartDateTicket = async (payload: IStartTicketStudent) => {
    return await api.put<any, ApiResponse>(
      `/Tickets/${payload.packageItemId}/StartDate`,
      payload
    )
  }

  const changeExpireDateTicket = async (payload: IExpireTicketStudent) => {
    return await api.put<any, ApiResponse>(
      `/Tickets/${payload.packageItemId}/ExpireDate`,
      payload
    )
  }

  const deleteTicketByPackageItem = async (data: IDeleteTicketPayload) => {
    return await api.delete<any, ApiResponse>(
      `Tickets/${data.packageItemId}/Delete`,
      { data }
    )
  }

  const sendPackageToAnotherStudent = async (
    packageItemId: number,
    studentId: number
  ) => {
    return await api.post<any, ApiResponse>(
      `PackageItems/${packageItemId}/SendPackage`,
      { studentId }
    )
  }

  const changePackage = async (packageItemId: number, newPackageId: number) => {
    return await api.post<any, ApiResponse>(
      `PackageItems/${packageItemId}/ChangePackage`,
      { newPackageId }
    )
  }

  const deletePackageByPackageItem = async (
    packageItemId: number,
    comment: string
  ) => {
    return await api.delete<any, ApiResponse>(
      `PackageItems/${packageItemId}/Delete`,
      { data: { comment } }
    )
  }

  const redeemPackageByStudentId = async (data: IRedeemPackageStudent) => {
    const payload = {
      ...data,
      urlPath: window.location.href,
      agent: navigator.userAgent,
      adminId: adminProfile?.id,
    }
    return api.post<any, ApiResponse>(`Redeems/Activate`, payload)
  }

  return {
    getStudentInfoById,
    getAllStudents,
    updateStudentInfoById,
    getStudentPackageItems,
    addNewTicketStudent,
    activatePackageItemById,
    changeStartDateTicket,
    changeExpireDateTicket,
    deleteTicketByPackageItem,
    sendPackageToAnotherStudent,
    changePackage,
    deletePackageByPackageItem,
    redeemPackageByStudentId,
  }
}
