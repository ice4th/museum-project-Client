/**
 * useCreatePackageForm Composition API
 */

import { Notyf } from 'notyf'
import { reactive, toRefs } from 'vue'
import { themeColors } from '../../utils/themeColors'
import { PrivateSlot } from '/@src/types/enums/package.enum'
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
    products: items,
    curriculums: items,
    featureGroups: items,
    fmcPackages: items,
    moocCourses: items,
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
