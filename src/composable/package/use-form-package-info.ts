/**
 * useCreatePackageForm Composition API
 */

import { Notyf } from 'notyf'
import { computed, onMounted, reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { errMessage, isNil } from '../../helpers/filter.helper'
import { Purchasable } from '../../types/enums/package.enum'
import useOptionApi from '../api/useOptionApi'
import usePackageApi from '../api/usePackageApi'
import { IUseCratePackageForm } from '/@src/types/interfaces/package.interface'

/**
 * global notify
 */
const notyfMessage = new Notyf({
  duration: 2000,
  position: {
    x: 'center',
    y: 'top',
  },
})

export default function useFormPackageInfo() {
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
  const { getPackageById, createPackage: savePkg } = usePackageApi()

  /**
   * Router
   */
  const router = useRouter()
  const route = useRoute()

  /**
   * State
   */
  const state = reactive<IUseCratePackageForm>({
    products: [],
    curriculums: [],
    featureGroups: [],
    fmcPackages: [],
    moocCourses: [],
    loadingOptions: false,
    loadingPackage: false,
    notFoundPackage: false,
    formPackageInfo: {
      packageName: '',
      packageNameInternal: '',
      productId: NaN,
      purchasable: false,
      status: '0',
      detail: '',
      comment: '',
      globishLevel: '',
      cefrLevel: '',
      price: undefined,
      beforeDiscount: undefined,
      installmentMonth: undefined,
      engder: undefined,
      type: '',
      duration: undefined,
      ticketOneOnOne: undefined,
      ticketFreetalk: undefined,
      ticketGroup: undefined,
      ticketMaster: undefined,
      photo: '',
      curriculumSheet: '',
      curriculumId: undefined,
      featureGroupId: undefined,
      findMycoachId: undefined,
      moocCourseId: undefined,
      privateSlot: undefined,
    },
  })

  /**
   * Computed
   */
  const disabledDone = computed(() => {
    return (
      !state.formPackageInfo.packageName ||
      !state.formPackageInfo.productId ||
      !state.formPackageInfo.globishLevel ||
      !state.formPackageInfo.cefrLevel ||
      !state.formPackageInfo.price ||
      isNil(state.formPackageInfo.installmentMonth) ||
      !state.formPackageInfo.type ||
      !state.formPackageInfo.duration ||
      !state.formPackageInfo.ticketOneOnOne ||
      !state.formPackageInfo.privateSlot
    )
  })

  /**
   * Methods
   */
  const fetchOptions = async () => {
    state.loadingOptions = true

    // fetch all options
    const [products, curriculums, featureGroups, fmcPackages, moocCourses] =
      await Promise.all([
        getProducts(),
        getCurriculums(),
        getFeatureGroups(),
        getFmcPackages(),
        getMoocCourses(),
      ])
    state.products = products
    state.curriculums = curriculums
    state.featureGroups = featureGroups
    state.fmcPackages = fmcPackages
    state.moocCourses = moocCourses
    state.loadingOptions = false
  }
  const fetchPackage = async () => {
    state.loadingPackage = true

    const packageId = parseInt(route.params.id as string)
    // fetch package by id
    const res = await getPackageById(packageId)

    if (res) {
      state.formPackageInfo = {
        packageName: res.packageName,
        packageNameInternal: res.packageNameInternal,
        productId: res.productInfo.id,
        purchasable: res.purchasable === Purchasable.SALE,
        status: `${res.status}`,
        detail: res.detail,
        comment: res.comment,
        globishLevel: res.globishLevel,
        cefrLevel: res.cefrLevel || '',
        price: res.price,
        beforeDiscount: res.beforeDiscount,
        installmentMonth: `${res.installmentMonth}`,
        engder: res.engder,
        type: res.type,
        duration: res.duration,
        ticketOneOnOne: res.ticket,
        ticketFreetalk: res.freeTalkTicket,
        ticketGroup: res.groupClassTicket,
        ticketMaster: res.masterClassTicket,
        photo: res.photo,
        curriculumSheet: res.curriculumSheet,
        curriculumId: res.curriculumId,
        featureGroupId: res.featureGroupId,
        findMycoachId: res.fmcId,
        moocCourseId: res.courseId,
        privateSlot: res.privateSlot,
      }
    } else {
      state.notFoundPackage = true
    }

    state.loadingPackage = false
  }
  const savePackage = async () => {
    // save form package info
    const { status, message } = await savePkg(state.formPackageInfo)
    if (status === 201) {
      notyfMessage.open({
        type: 'success',
        message: 'Package was created!',
      })
    } else {
      notyfMessage.open({
        message: errMessage(message),
        type: 'error',
      })
    }
  }

  /**
   * On Mounted
   */
  onMounted(() => {
    fetchOptions()
    // fetch package by id if update page
    if (route.name === 'product-package-:id-update' && route.params.id) {
      fetchPackage()
    }
  })

  return {
    ...toRefs(state),
    //  Computed
    disabledDone,
    //  Methods
    savePackage,
  }
}
