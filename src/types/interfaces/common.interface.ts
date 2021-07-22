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
}
