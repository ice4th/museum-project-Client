import useApi, { ApiResponse } from '../useApi'
import { checkResponseStatus } from '.'
import Axios, { AxiosResponse } from 'axios'

export default function useFileManagerApi() {
  const api = useApi()

  // const getFileLists = (
  //   params: IPaginationParams
  // ): Promise<AxiosResponse<IPaginationResponse<IRoleInfo[]>>> => {
  //   return api.get<IPaginationResponse<IRoleInfo[]>>('/Roles', { params })
  // }

  const getDownloadItem = (url: string) => {
    return Axios.get(url, { responseType: 'blob' })
  }

  const createNewFolder = (paylaod: { folderName: string }) => {
    return api.post<any, ApiResponse>('Media/Directory', { paylaod })
  }
  return { getDownloadItem, createNewFolder }
}
