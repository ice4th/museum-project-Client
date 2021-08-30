export interface IGetFile {
  max: number
  prefix?: string
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
