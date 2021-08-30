import useApi, { ApiResponse } from '../useApi'
import {
  IFileList,
  IGetFileWithPagination,
  IUploadFile,
} from '/@src/types/interfaces/file-manager.interface'
import Axios, { AxiosResponse } from 'axios'
import FormData from 'form-data'
export default function useFileManagerApi() {
  const api = useApi()

  const getFileListsWithPagination = (params: IGetFileWithPagination) => {
    return api.get<any, ApiResponse<IFileList>>(`Media`, { params })
  }

  const uploadFile = (payload: IUploadFile) => {
    const formData = new FormData()
    formData.append('file', payload.file)
    formData.append('filePath', payload.filePath)
    return api.post<any, ApiResponse>(`Media/Upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  const getDownloadItem = (url: string) => {
    return Axios.get<any, ApiResponse>(url, { responseType: 'blob' })
  }

  const createNewFolder = (paylaod: { folderName: string }) => {
    return api.post<any, ApiResponse>('Media/Directory', paylaod)
  }
  return {
    getDownloadItem,
    createNewFolder,
    getFileListsWithPagination,
    uploadFile,
  }
}
