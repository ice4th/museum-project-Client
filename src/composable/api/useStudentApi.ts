import useApi, { apiHandleError, ApiResponse } from '../useApi'
import useUserSession from '../useUserSession'
import { ISuccessMessage } from '../../types/interfaces/common.interface'
import {
  IPaginationParams,
  IPaginationResponse,
} from '/@src/types/interfaces/common.interface'
import {
  IRedeemPackageStudent,
  StudentPackageItemResponse,
  IAddPackageStudent,
} from '/@src/types/interfaces/package-item.interface'
import {
  IStudentPrivateClass,
  IStudentList,
  IUpdateStudentProfile,
  IStudentInfo,
  IStudentGroupClass,
  IUpdateStudentGlobishPlusProfile,
  IStudentGlobishPlusInfo,
} from '/@src/types/interfaces/student.interface'
import {
  IAddTicketStudent,
  IStartTicketStudent,
  IExpireTicketStudent,
  IDeleteTicketPayload,
} from '/@src/types/interfaces/ticket.interface'
interface LoginAsStudentResponse {
  link: string
}
export default function useStudentApi() {
  const api = useApi()
  const { catchReponse } = apiHandleError()
  const { user: adminProfile } = useUserSession()

  const getStudentInfoById = async (
    studentId: number
  ): Promise<IStudentInfo | undefined> => {
    const res = await api.get<IStudentInfo, ApiResponse>(
      `/Students/${studentId}`
    )
    return catchReponse(res)
  }

  const getAllStudents = async (
    params: IPaginationParams
  ): Promise<IPaginationResponse<IStudentList[]>> => {
    const res = await api.get<IPaginationResponse<IStudentList[]>, ApiResponse>(
      '/Students',
      { params: { ...params } }
    )
    return catchReponse(res)
  }

  const updateStudentInfoById = async (
    studentId: number,
    payload: IUpdateStudentProfile
  ) => {
    const res = await api.put<IStudentInfo, ApiResponse>(
      `/Students/${studentId}`,
      payload
    )
    return res
  }

  const getStudentPackageItems = async (
    studentId: number
  ): Promise<StudentPackageItemResponse | null> => {
    const res = await api.get<StudentPackageItemResponse, ApiResponse>(
      `/Students/${studentId}/PackageItems`
    )
    return catchReponse(res)
  }

  const addNewTicketStudent = async (payload: IAddTicketStudent) => {
    const res = await api.post<any, ApiResponse>('/Tickets', payload)
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
    return await api.put<any, ApiResponse>('/Tickets/Start', payload)
  }

  const changeExpireDateTicket = async (payload: IExpireTicketStudent) => {
    return await api.put<any, ApiResponse>('/Tickets/Expire', payload)
  }

  const deleteTicketByPackageItem = async (data: IDeleteTicketPayload) => {
    return await api.delete<any, ApiResponse>('Tickets', { data })
  }

  const sendPackageToAnotherStudent = async (
    packageItemId: number,
    studentId: number
  ) => {
    return await api.post<any, ApiResponse>(
      `PackageItems/${packageItemId}/Send`,
      { studentId }
    )
  }

  const changePackage = async (packageItemId: number, newPackageId: number) => {
    return await api.post<any, ApiResponse>(
      `PackageItems/${packageItemId}/Change`,
      { newPackageId }
    )
  }

  const deletePackageByPackageItem = async (
    packageItemId: number,
    comment: string
  ) => {
    return await api.delete<any, ApiResponse>(`PackageItems/${packageItemId}`, {
      data: { comment },
    })
  }

  const redeemPackageByStudentId = async (data: IRedeemPackageStudent) => {
    const payload = {
      ...data,
      urlPath: window.location.href,
      agent: navigator.userAgent,
      adminId: adminProfile?.id,
    }
    return api.post<any, ApiResponse>('Redeems/Activate', payload)
  }

  const getStudentPrivateClass = async (
    studentId: number,
    params: IPaginationParams
  ): Promise<IPaginationResponse<IStudentPrivateClass[]>> => {
    const res = await api.get<
      IPaginationResponse<IStudentPrivateClass[]>,
      ApiResponse
    >(`/Students/${studentId}/PrivateClasses`, { params: { ...params } })
    return catchReponse(res)
  }

  const loginByStudentId = async (studentId: number) => {
    return api.post<
      LoginAsStudentResponse,
      ApiResponse<LoginAsStudentResponse>
    >(`Students/${studentId}/LoginAsStudent`)
  }

  const addPackageItemByStudentId = async (payload: IAddPackageStudent) => {
    return api.post<any, ApiResponse>('PackageItems', payload)
  }

  const getStudentGroupClass = async (
    id: number,
    params: IPaginationParams
  ): Promise<IPaginationResponse<IStudentGroupClass[]>> => {
    const res = await api.get<
      IPaginationResponse<IStudentGroupClass[]>,
      ApiResponse
    >(`/Students/${id}/GroupClass`, { params: { ...params } })
    return catchReponse(res)
  }

  const forgotPassword = async (id: number) => {
    return await api.post<any, ApiResponse>(`Students/${id}/ForgotPassword`)
  }

  const getStudentGlobishPlusById = async (
    studentId: number
  ): Promise<IStudentGlobishPlusInfo | undefined> => {
    const res = await api.get<IStudentGlobishPlusInfo, ApiResponse>(
      `/Students/${studentId}/GlobishPlus`
    )
    return catchReponse(res)
  }

  const updateStudentGlobishPlusById = async (
    studentId: number,
    payload: IUpdateStudentGlobishPlusProfile
  ) => {
    const res = await api.put<ISuccessMessage, ApiResponse>(
      `/Students/${studentId}/GlobishPlus`,
      payload
    )
    return res
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
    getStudentPrivateClass,
    loginByStudentId,
    addPackageItemByStudentId,
    getStudentGroupClass,
    forgotPassword,
    getStudentGlobishPlusById,
    updateStudentGlobishPlusById,
  }
}
