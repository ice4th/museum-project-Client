export interface IGetFile {
  perPage: number
  nextContinuationToken?: string
}

export interface IUploadFile {
  pathName?: string
  name?: string
}

export interface IFileList {
  baseUrl: string
  currentDirectory: string
  files: IFile[]
  subDirectories: string[]
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
