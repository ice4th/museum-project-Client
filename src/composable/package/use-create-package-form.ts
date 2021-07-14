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

  return {
    ...toRefs(state),
    verifyPackage,
    createPackage,
  }
}
