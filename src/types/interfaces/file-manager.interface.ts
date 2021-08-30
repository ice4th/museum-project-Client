export interface IGetFileWithPagination {
  max: number
  prefix: string
  search?: string
  continuationToken?: string
}

export interface IUploadFile {
  filePath?: string
  file: File
}

export interface IFileList {
  baseUrl: string
  currentDirectory: string
  files: IFile[]
  subDirectories: IFile[]
  total: number
  nextContinuationToken: string
}

export interface IFile {
  name: string
  src: string
  lastModified: string
  size: string
  type: string
}

export interface IDirectoryNavigator {
  key: string
  label: string
}
