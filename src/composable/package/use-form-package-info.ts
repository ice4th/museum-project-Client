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
  const { getPackageById, createPackage, updatePackage } = usePackageApi()

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
      parseInt(`${state.formPackageInfo.price}`) < 0 ||
      parseInt(`${state.formPackageInfo.beforeDiscount}`) < 0 ||
      isNil(state.formPackageInfo.installmentMonth) ||
      !state.formPackageInfo.type ||
      parseInt(`${state.formPackageInfo.duration}`) < 0 ||
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
        packageId: res.id,
        packageName: res.packageName,
        packageNameInternal: res.packageNameInternal,
        productId: res.productInfo.id,
        purchasable: res.purchasable === Purchasable.SALE,
        status: `${res.status}`,
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
  const savePackage = async () => {
    // save form package info
    const { status, message, data } = await createPackage(state.formPackageInfo)
    if (status === 201) {
      notyfMessage.open({
        type: 'success',
        message: 'Package was created!',
      })
      router.push({
        name: 'product-package',
        params: { id: `${data.id}` },
      })
    } else {
      notyfMessage.open({
        message: errMessage(message),
        type: 'error',
      })
    }
  }
  const editPackage = async () => {
    // save form package info
    const { status, message } = await updatePackage(state.formPackageInfo)
    if (status === 200) {
      await fetchPackage()
      router.push({ name: 'product-package' })
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
    // fetch package by id if update page or details page
    const page = ['product-package-:id-update', 'product-package-:id-details']
    if (page.includes(String(route.name)) && route.params.id) {
      fetchPackage()
    }
  })

  return {
    ...toRefs(state),
    //  Computed
    disabledDone,
    //  Methods
    savePackage,
    editPackage,
  }
}
