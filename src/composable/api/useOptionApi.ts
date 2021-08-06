import { checkResponseStatus } from '.'
import useApi from '../useApi'
import {
  ProductOption,
  PackageOption,
  PartnerOption,
  MoocOption,
  CurriculumOption,
  FeatureGroupOption,
  FindMyCoachOption,
  StudentOption,
} from '/@src/types/interfaces/option.interface'

export default function useOptionApi() {
  const api = useApi()

  const getProducts = async (): Promise<ProductOption[]> => {
    const res = await api.get<ProductOption[]>('/Options/Products')
    return checkResponseStatus(res) || []
  }

  const getPackages = async (): Promise<PackageOption[]> => {
    const res = await api.get<PackageOption[]>('/Options/Packages')
    return checkResponseStatus(res) || []
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
      '/Options/Voxy/getFeatureGroups'
    )
    return checkResponseStatus(res) || []
  }

  const getFmcPackages = async (): Promise<FindMyCoachOption[]> => {
    const res = await api.get<FindMyCoachOption[]>(
      '/Options/Packages/Products/FindMyCoach'
    )
    return checkResponseStatus(res) || []
  }

  const getStudents = async (): Promise<StudentOption[]> => {
    const res = await api.get<StudentOption[]>('/Options/Students')
    console.log(res.data)
    return checkResponseStatus(res) || []
  }
  return {
    getProducts,
    getPackages,
    getPartners,
    getMoocCourses,
    getCurriculums,
    getFeatureGroups,
    getFmcPackages,
    getStudents,
  }
}
