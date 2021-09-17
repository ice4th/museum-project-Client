import { reactive, toRefs } from 'vue'
import { checkResponseStatus } from '.'
import useApi from '../useApi'
import { ProductType } from '/@src/types/enums/product.enum'
import { QuizType } from '/@src/types/enums/quiz.enum'
import {
  IPaginationParams,
  IPaginationResponse,
} from '/@src/types/interfaces/common.interface'
import {
  ProductOption,
  PackageOption,
  PartnerOption,
  MoocOption,
  CurriculumOption,
  FeatureGroupOption,
  FindMyCoachOption,
  StudentOption,
  TeamOption,
  QuizOption,
} from '/@src/types/interfaces/option.interface'
interface UseOptionApiState {
  productOptions: ProductOption[]
  productTypeOptions: ProductType[]
  teamOptions: TeamOption[]
  quizOptions: QuizOption[]
}

export default function useOptionApi() {
  const api = useApi()
  const state = reactive<UseOptionApiState>({
    productOptions: [],
    productTypeOptions: [],
    teamOptions: [],
    quizOptions: [],
  })

  const getProducts = async ({
    currentPage,
    perPage,
    search,
  }: IPaginationParams): Promise<ProductOption[]> => {
    const params = new URLSearchParams({
      currentPage: `${currentPage}`,
      perPage: `${perPage}`,
      search: search || '',
    })
    const res = await api.get<ProductOption[]>(
      `/Options/Products?${params.toString()}`
    )
    return checkResponseStatus(res)?.data || []
  }

  const getProductType = async (): Promise<ProductType[]> => {
    const res = await api.get<ProductType[]>('/Options/Products/Types')
    state.productTypeOptions = checkResponseStatus(res) || []
    return state.productTypeOptions
  }

  const getPackages = async (
    search?: string,
    params?: IPaginationParams
  ): Promise<PackageOption[]> => {
    console.log(params)
    const res = await api.get<IPaginationResponse<PackageOption[]>>(
      '/Options/Packages',
      {
        params: {
          currentPage: params?.currentPage || 1,
          perPage: params?.perPage || 10,
          search,
        },
      }
    )
    return checkResponseStatus(res) ? res.data.data : []
  }

  const getPartners = async (): Promise<PartnerOption[]> => {
    const res = await api.get<PartnerOption[]>('/Options/Partners')
    return checkResponseStatus(res) || []
  }

  const getMoocCourses = async ({
    currentPage,
    perPage,
    search,
  }: IPaginationParams): Promise<MoocOption[]> => {
    const params = new URLSearchParams({
      currentPage: `${currentPage}`,
      perPage: `${perPage}`,
      search: search || '',
    })
    const res = await api.get<MoocOption[]>(
      `/Options/Moocs?${params.toString()}`
    )
    return checkResponseStatus(res)?.data || []
  }

  const getCurriculums = async ({
    currentPage,
    perPage,
    search,
  }: IPaginationParams): Promise<CurriculumOption[]> => {
    const params = new URLSearchParams({
      currentPage: `${currentPage}`,
      perPage: `${perPage}`,
      search: search || '',
    })
    const res = await api.get<CurriculumOption[]>(
      `/Options/Curriculums?${params.toString()}`
    )
    return checkResponseStatus(res)?.data || []
  }

  const getFeatureGroups = async (): Promise<FeatureGroupOption[]> => {
    const res = await api.get<FeatureGroupOption[]>(
      '/Options/Voxy/FeatureGroups'
    )
    return checkResponseStatus(res) || []
  }

  const getFmcPackages = async ({
    currentPage,
    perPage,
    search,
  }: IPaginationParams): Promise<FindMyCoachOption[]> => {
    const params = new URLSearchParams({
      currentPage: `${currentPage}`,
      perPage: `${perPage}`,
      search: search || '',
      type: 'find_my_coach',
    })
    const res = await api.get<FindMyCoachOption[]>(
      `/Options/Packages/Products/Types?${params.toString()}`
    )
    return checkResponseStatus(res)?.data || []
  }

  const getStudents = async (
    search?: string,
    params?: IPaginationParams
  ): Promise<StudentOption[]> => {
    const res = await api.get<IPaginationResponse<StudentOption[]>>(
      '/Options/Students',
      {
        params: {
          currentPage: params?.currentPage || 1,
          perPage: params?.perPage || 10,
          search,
        },
      }
    )
    return checkResponseStatus(res) ? res.data.data : []
  }

  const getTeams = async ({
    currentPage,
    perPage,
    search,
  }: IPaginationParams): Promise<TeamOption[]> => {
    const res = await api.get<TeamOption[]>(
      `/Options/Teams?currentPage=${currentPage}&perPage=${perPage}&search=${
        search || ''
      }`
    )
    return checkResponseStatus(res)?.data || []
  }

  const getQuizzes = async (type: QuizType): Promise<QuizOption[]> => {
    const res = await api.get<QuizOption[]>('/Options/Quizzes', {
      params: { type },
    })
    state.quizOptions = checkResponseStatus(res) || []
    return state.quizOptions
  }
  return {
    ...toRefs(state),
    getProducts,
    getProductType,
    getPackages,
    getPartners,
    getMoocCourses,
    getCurriculums,
    getFeatureGroups,
    getFmcPackages,
    getStudents,
    getTeams,
    getQuizzes,
  }
}
