import { Notyf } from 'notyf'
import { computed, onMounted, reactive, toRefs } from 'vue-demi'
import { useRouter, useRoute } from 'vue-router'
import { errMessage, isNil } from '../../helpers/filter.helper'
import { Purchasable } from '../../types/enums/product.enum'
import useOptionApi from '../api/useOptionApi'
import usePackageApi from '../api/usePackageApi'

export interface IUsePackageDetailsState {
  formPackageInfo: {
    packageId?: number
    // package details
    packageName: string
    packageNameInternal?: string
    productId: number
    purchasable: boolean
    status: '0' | '1'
    detail: string
    comment: string
    // price & ticket
    price?: number
    beforeDiscount?: number
    installmentMonth?: string
    duration?: number
    ticketOneOnOne?: number
    ticketFreetalk?: number
    ticketGroup?: number
    ticketMaster?: number
    //   course detail
    privateSlot?: number
    type: string
    globishLevel: string
    cefrLevel: string
    photo?: string
    // package's addons
    curriculumSheet?: string
    curriculumId?: number
    engder?: string
    featureGroupId?: number
    findMycoachId?: number
    moocCourseId?: number
  }
  // loading
  loadingOptions: boolean
  loadingPackage: boolean
  notFoundPackage: boolean
  // other logic
  editable: boolean
}

const notyfMessage = new Notyf({
  duration: 2000,
  position: {
    x: 'center',
    y: 'top',
  },
})

export default function usePackageDetails() {
  /**
   * Use Api
   */
  const {
    getProducts,
    getCurriculums,
    getFeatureGroups,
    getFmcPackages,
    getMoocCourses,
  } = useOptionApi()
  const { getPackageById, createPackage, updatePackage } = usePackageApi()

  /**
   * Use Router
   */
  const route = useRoute()
  const router = useRouter()

  /**
   * State
   */
  const state = reactive<IUsePackageDetailsState>({
    formPackageInfo: {
      packageId: undefined,
      // package details
      packageName: '',
      packageNameInternal: '',
      productId: NaN,
      purchasable: false,
      status: '0',
      detail: '',
      comment: '',
      // price & ticket
      price: undefined,
      beforeDiscount: undefined,
      installmentMonth: undefined,
      duration: undefined,
      ticketOneOnOne: undefined,
      ticketFreetalk: undefined,
      ticketGroup: undefined,
      ticketMaster: undefined,
      //   course detail
      privateSlot: undefined,
      type: '',
      globishLevel: '',
      cefrLevel: '',
      photo: '',
      // package's addons
      curriculumSheet: '',
      curriculumId: undefined,
      engder: undefined,
      featureGroupId: undefined,
      findMycoachId: undefined,
      moocCourseId: undefined,
    },
    // loading
    loadingOptions: false,
    loadingPackage: false,
    notFoundPackage: false,
    // readonly logic
    editable: false,
  })

  /**
   * Methods
   */
  const fetchProductsOption = (search?: string) => {
    return getProducts({
      currentPage: 1,
      perPage: 25,
      search,
    })
  }
  const fetchCurriculumsOption = (search?: string) => {
    return getCurriculums({
      currentPage: 1,
      perPage: 25,
      search,
    })
  }
  const fetchFindMyCoachesOption = (search?: string) => {
    return getFmcPackages({
      currentPage: 1,
      perPage: 25,
      search,
    })
  }
  const fetchMoocCoursesOption = (search?: string) => {
    return getMoocCourses({
      currentPage: 1,
      perPage: 25,
      search,
    })
  }
  const setDefaultPackage = () => {}
  const fetchPackage = async () => {
    state.loadingPackage = true

    const packageId = parseInt(route.params.id as string)
    // fetch package by id
    const res = (await getPackageById(packageId)) as any

    if (res) {
      state.formPackageInfo = {
        packageId: res.id,
        packageName: res.packageName,
        packageNameInternal: res.packageNameInternal,
        productId: res.productInfo.id,
        purchasable: res.purchasable === Purchasable.YES,
        status: `${res.status}` as any,
        detail: res.detail,
        comment: res.comment,
        globishLevel: res.globishLevel,
        cefrLevel: res.cefrLevel || '',
        price: parseInt(`${res.price}`) || 0,
        beforeDiscount: parseInt(`${res.beforeDiscount}`) || 0,
        installmentMonth: `${res.installmentMonth}`,
        engder: res.engder || undefined,
        type: res.type,
        duration: parseInt(`${res.duration}`) || 0,
        ticketOneOnOne: res.ticket || 0,
        ticketFreetalk: res.freeTalkTicket || 0,
        ticketGroup: res.groupClassTicket || 0,
        ticketMaster: res.masterClassTicket || 0,
        photo: res.photo || undefined,
        curriculumSheet: res.curriculumSheet || undefined,
        curriculumId: res.curriculumId || undefined,
        featureGroupId: res.featureGroupId || undefined,
        findMycoachId: res.fmcId || undefined,
        moocCourseId: res.courseId || undefined,
        privateSlot: res.privateSlot || undefined,
      }
    } else {
      state.notFoundPackage = true
    }
    state.loadingPackage = false
  }
  const onSavePackage = async () => {
    const { status, message, data } = await createPackage(state.formPackageInfo)
    if (status === 201) {
      notyfMessage.open({
        type: 'success',
        message: 'Package was created!',
      })
      router.push({
        name: 'products-packages-:id',
        params: { id: `${data.id}` },
      })
    } else {
      notyfMessage.open({
        message: errMessage(message),
        type: 'error',
      })
    }
  }
  const onEditPackage = async () => {
    const { status, message } = await updatePackage(state.formPackageInfo)
    if (status === 200) {
      router.push({
        name: 'products-packages-:id',
        params: {
          id: parseInt(`${state.formPackageInfo.packageId}`),
        },
      })
      notyfMessage.open({
        type: 'success',
        message: 'Package was updated!',
      })
    } else {
      notyfMessage.open({
        message: errMessage(message),
        type: 'error',
      })
    }
  }
  const onPressDone = async () => {
    if (route.hash === '#create') {
      await onSavePackage()
    } else {
      await onEditPackage()
    }
  }

  /**
   * On Mounted
   */
  onMounted(() => {
    if (route.hash !== '#create') {
      fetchPackage()
    } else {
      state.editable = true
    }
    if (route.hash === '#edit') {
      state.editable = true
    }
  })

  return {
    ...toRefs(state),
    // Methods
    fetchProductsOption,
    fetchCurriculumsOption,
    fetchFindMyCoachesOption,
    fetchMoocCoursesOption,
    onPressDone,
  }
}
