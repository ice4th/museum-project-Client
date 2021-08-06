import {
  CurriculumOption,
  FeatureGroupOption,
  FindMyCoachOption,
  MoocOption,
  PackageOption,
  PartnerOption,
  ProductOption,
} from '../types/interfaces/option.interface'
import ApiService, { ApiServiceResponse } from './api.service'

export default class OptionService {
  public static products(): Promise<ApiServiceResponse<ProductOption[]>> {
    return ApiService.get<ProductOption[]>('/Options/Products')
  }

  public static packages(): Promise<ApiServiceResponse<PackageOption[]>> {
    return ApiService.get<PackageOption[]>('/Options/Packages')
  }

  public static partners(): Promise<ApiServiceResponse<PartnerOption[]>> {
    return ApiService.get<PartnerOption[]>('/Options/Partners')
  }

  public static MoocCourses(): Promise<ApiServiceResponse<MoocOption[]>> {
    return ApiService.get<MoocOption[]>('/Options/Moocs')
  }

  public static curriculums(): Promise<ApiServiceResponse<CurriculumOption[]>> {
    return ApiService.get<CurriculumOption[]>('/Options/Curriculums/Used')
  }

  public static featureGroups(): Promise<
    ApiServiceResponse<FeatureGroupOption[]>
  > {
    return ApiService.get<FeatureGroupOption[]>(
      '/Options/Voxy/getFeatureGroups'
    )
  }

  public static fmcPackages(): Promise<
    ApiServiceResponse<FindMyCoachOption[]>
  > {
    return ApiService.get<FindMyCoachOption[]>(
      '/Options/Packages/Products/FindMyCoach'
    )
  }
}
