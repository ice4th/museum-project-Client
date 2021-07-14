/**
 * useCreatePackageForm Composition API
 */

import { Notyf } from 'notyf'
import { reactive, toRefs } from 'vue'
import { themeColors } from '../../utils/themeColors'
import {
  CEFRLevel,
  GlobishLevel,
  PrivateSlot,
  Purchasable,
  StatusPackage,
  TypePackage,
} from '/@src/types/enums/package.enum'
import { IUseCratePackageForm } from '/@src/types/interfaces/package.interface'

/**
 * global notify
 */
const notyfSuccess = new Notyf({
  duration: 2000,
  position: {
    x: 'center',
    y: 'top',
  },
  types: [
    {
      type: 'success',
      background: themeColors.success,
      icon: {
        className: 'fas fa-check',
        tagName: 'i',
        text: '',
      },
    },
  ],
})

export default function useCreatePackageForm() {
  const mockProducts = [
    { id: 1, name: 'product 001' },
    { id: 2, name: 'product 002' },
    { id: 3, name: 'product 003' },
    { id: 4, name: 'product 004' },
    { id: 5, name: 'product 005' },
    { id: 6, name: 'product 006' },
    { id: 7, name: 'product 007' },
    { id: 8, name: 'product 008' },
  ]
  /**
   * use state
   */
  const state = reactive<IUseCratePackageForm>({
    products: mockProducts,
    curriculums: [],
    featureGroups: [],
    fmcPackages: [],
    moocCourses: [],
    createPackageForm: {
      packageName: 'mock',
      packageNameInternal: '',
      productId: NaN,
      purchasable: Purchasable.NOT_FOR_SALE,
      status: StatusPackage.NOT_SHOW_ON_WEBSITE,
      detail: '',
      comment: '',
      globishLevel: GlobishLevel.G0,
      cefrLevel: CEFRLevel.NONE,
      price: 0,
      beforeDiscount: 0,
      installmentMonth: 0,
      engder: undefined,
      type: TypePackage.ADULT,
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
      privateSlot: PrivateSlot.THIRTY_MINUTE,
    },
  })

  /**
   * Methods
   */
  const verifyPackage = () => {
    console.log(state.createPackageForm)
  }
  const createPackage = () => {
    notyfSuccess.open({
      type: 'success',
      message: 'Created Success!',
    })
  }
  const logPackageName = (val: string) => {
    console.log(val)
  }

  return {
    ...toRefs(state),
    verifyPackage,
    createPackage,
    logPackageName,
  }
}
