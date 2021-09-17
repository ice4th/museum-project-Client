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

  const getProducts = async (): Promise<ProductOption[]> => {
    const res = await api.get<ProductOption[]>('/Options/Products')
    state.productOptions = checkResponseStatus(res) || []
    return state.productOptions
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

  const getMoocCourses = async (): Promise<MoocOption[]> => {
    const res = await api.get<MoocOption[]>('/Options/Moocs')
    return checkResponseStatus(res) || []
  }

  const getCurriculums = async (): Promise<CurriculumOption[]> => {
    const res = await api.get<CurriculumOption[]>('/Options/Curriculums/Used')
    return checkResponseStatus(res) || []
  }

  const getFeatureGroups = async (): Promise<FeatureGroupOption[]> => {
    const res = await api.get<FeatureGroupOption[]>(
      '/Options/Voxy/FeatureGroups'
    )
    return checkResponseStatus(res) || []
  }

  const getFmcPackages = async (): Promise<FindMyCoachOption[]> => {
    const res = await api.get<FindMyCoachOption[]>(
      '/Options/Packages/Products/FindMyCoach'
    )
    return checkResponseStatus(res) || []
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

  const getTeams = async (): Promise<TeamOption[]> => {
    const res = await api.get<TeamOption[]>('/Options/Teams')
    state.teamOptions = checkResponseStatus(res) || []
    return state.teamOptions
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
