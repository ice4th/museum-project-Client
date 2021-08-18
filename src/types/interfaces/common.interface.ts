export interface IPaginationResponse<T> {
  currentPage: number
  data: T
  nextPage?: number
  perPage: number
  previousPage?: number
  total: number
  totalPage: number
}

export interface IPaginationParams {
  currentPage: number
  perPage: number
  search?: string
}

export interface INameLang {
  en?: string
  th?: string
}

export interface ISuccessMessage {
  message: string
}

export interface IInitialAvatar {
  initials: string
  color: string
}
