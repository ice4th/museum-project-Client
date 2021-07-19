/**
 * useCreatePackageForm Composition API
 */

import { Notyf } from 'notyf'
import { computed, onMounted, reactive, toRefs } from 'vue'
import PackageService from '../../api/package.service'
import { errMessage, isNil } from '../../helpers/filter.helper'
import { themeColors } from '../../utils/themeColors'
import { PrivateSlot } from '/@src/types/enums/package.enum'
import {
  ICratePackageForm,
  IUseCratePackageForm,
} from '/@src/types/interfaces/package.interface'

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
  const items = [
    { id: 1, name: 'item 001' },
    { id: 2, name: 'item 002' },
    { id: 3, name: 'item 003' },
    { id: 4, name: 'item 004' },
    { id: 5, name: 'item 005' },
    { id: 6, name: 'item 006' },
    { id: 7, name: 'item 007' },
    { id: 8, name: 'item 008' },
  ]
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
  const createPackage = async () => {
    // call API service for create package
    const { status, message } = await PackageService.createPackage(
      state.createPackageForm
    )
    if (status === 200) {
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
    const { data } = await PackageService.getAllPackages()
    state.products = data
  })

  return {
    ...toRefs(state),
    disabledDone,
    createPackage,
    clearPackageState,
  }
}
