/**
 * useCreatePackageForm Composition API
 */

import { Notyf } from 'notyf'
import { computed, onMounted, reactive, toRefs } from 'vue'
import PackageService from '../../api/package.service'
import { errMessage, isNil } from '../../helpers/filter.helper'
import useOptionApi from '../api/useOptionApi'
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

export default function useCreatePackageForm() {
  /**
   * use state
   */
  const state = reactive<IUseCratePackageForm>({
    products: [],
    curriculums: [],
    featureGroups: [],
    fmcPackages: [],
    moocCourses: [],
    createPackageForm: {
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
  const {
    getProducts,
    getCurriculums,
    getFeatureGroups,
    getFmcPackages,
    getMoocCourses,
  } = useOptionApi()

  /**
   * computed
   */
  const disabledDone = computed(() => {
    return (
      !state.createPackageForm.packageName ||
      !state.createPackageForm.productId ||
      !state.createPackageForm.globishLevel ||
      !state.createPackageForm.cefrLevel ||
      !state.createPackageForm.price ||
      isNil(state.createPackageForm.installmentMonth) ||
      !state.createPackageForm.type ||
      !state.createPackageForm.duration ||
      !state.createPackageForm.ticketOneOnOne ||
      !state.createPackageForm.privateSlot
    )
  })

  /**
   * Methods
   */

  /** clear all package input */
  const clearPackageState = () => {
    state.createPackageForm = {
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
    }
  }
  /** create new package */
  const createPackage = async () => {
    // call API service for create package
    const { status, message } = await PackageService.createPackage(
      state.createPackageForm
    )
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
    // clear all data
    clearPackageState()
  }

  /**
   * On Mounted
   */
  onMounted(async () => {
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
  })

  return {
    ...toRefs(state),
    disabledDone,
    createPackage,
    clearPackageState,
  }
}
