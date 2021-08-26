import useApi, { ApiResponse } from '../useApi'
import { checkResponseStatus } from '.'
import { IFileList } from '/@src/types/interfaces/file-manager.interface'
import Axios, { AxiosResponse } from 'axios'

export default function useFileManagerApi() {
  const api = useApi()

  // const getFileLists = (
  //   params: IPaginationParams
  // ): Promise<IFileList> => {
  //   return
  // }

  const getDownloadItem = (url: string) => {
    return Axios.get<any, ApiResponse>(url, { responseType: 'blob' })
  }

  const createNewFolder = (paylaod: { folderName: string }) => {
    return api.post<any, ApiResponse>('Media/Directory', paylaod)
  }
  return { getDownloadItem, createNewFolder }
}
