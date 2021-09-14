/**
 * useCreatePackage Composition API
 */

import { computed, reactive, toRefs } from 'vue'
import {
  ICreateAddonPackage,
  IPackageGroupInfo,
  IUpdateAddonPackage,
} from '/@src/types/interfaces/package.interface'
import { useRoute, useRouter } from 'vue-router'
import usePackageApi from '../api/usePackageApi'
import { errMessage } from '/@src/helpers/filter.helper'
import useNotyf from '../useNotyf'

/**
 * add type for render with type
 */
export interface IAddonPackageWithType extends ICreateAddonPackage {
  type: 'main' | 'addon'
}
export interface IUseCreatePackageState {
  packageGroupInfo: IPackageGroupInfo[]
}
export default function useManagePackageGroup() {
  const state = reactive<IUseCreatePackageState>({
    packageGroupInfo: [],
  })
  const notyf = useNotyf()
  const route = useRoute()
  const router = useRouter()

  const isEditPage = computed(() => route.hash === '#edit')
  const {
    createPackageGroup: createPackageGroupApi,
    getAddonPackageByMainPackageId,
  } = usePackageApi()

  // const displayPackageNameById = (id: number) => {
  //   return state.packages.find((pk) => pk.id === id)?.packageName || ''
  // }

  // const displayPackageImageById = (id: number) => {
  //   return state.packages.find((pk) => pk.id === id)?.photo || ''
  // }

  // const toggleShowMainPackageSection = () => {
  //   showMainPackageSection.value = !showMainPackageSection.value
  // }

  // const toggleShowAddonPackageSection = (addon?: IAddonPackageWithType) => {
  //   state.currentAddonPackage = addon
  //   showAddonSection.value = !showAddonSection.value
  // }

  // const addMainPackage = (mainPk: IUpdateAddonPackage) => {
  //   /**
  //    * @info remove old main package
  //    */
  //   if (state.mainPackageId && mainPk.packageId !== state.mainPackageId) {
  //     state.addonPackages = state.addonPackages.filter(
  //       (pk) => pk.packageId !== state.mainPackageId
  //     )
  //   }
  //   state.mainPackageId = mainPk.packageId
  //   const index = state.addonPackages.findIndex(
  //     (pk) => pk.packageId === state.mainPackageId
  //   )
  //   if (index >= 0) {
  //     state.addonPackages[index] = mainPk
  //   } else {
  //     state.addonPackages = [mainPk]
  //       .concat(state.addonPackages)
  //       .map((pk, index) => {
  //         return { ...pk, idx: index + 1 }
  //       })
  //   }
  //   state.mainSelectedPackage = mainPk
  //   toggleShowMainPackageSection()
  // }

  // const addAddonPackage = (addon: IUpdateAddonPackage) => {
  //   if (addon.packageId === state.mainPackageId) {
  //     notyf.warning('package id is duplicate main package')
  //     return
  //   }
  //   const havePackage = state.addonPackages.some(
  //     (pk) => pk.packageId === addon.packageId
  //   )
  //   const isMyPackage = state.addonPackages.some((pk) => pk.idx === addon.idx)
  //   if (havePackage && !isMyPackage) {
  //     notyf.warning('package id is duplicate')
  //     return
  //   }
  //   if (addon.idx) {
  //     const index = state.addonPackages.findIndex(
  //       (pk) => pk.packageId === addon.packageId
  //     )
  //     state.addonPackages[index] = addon
  //   } else {
  //     state.addonPackages.push({
  //       ...addon,
  //       idx: state.addonPackages.length + 1,
  //     })
  //   }
  //   toggleShowAddonPackageSection()
  // }

  // const removePackage = async (packageId: number) => {
  //   state.addonPackages = await state.addonPackages
  //     .filter((pk) => pk.packageId !== packageId)
  //     .map((pk, index) => {
  //       return { ...pk, idx: index + 1 }
  //     })
  // }

  const createPackageGroup = async (packageGroup: {
    mainPackage: IUpdateAddonPackage
    addonPackages: IUpdateAddonPackage[]
  }) => {
    console.log('createPackageGroup', packageGroup)
    const { status, message } = await createPackageGroupApi({
      mainPackageId: packageGroup.mainPackage.packageId,
      addonPackages: packageGroup.addonPackages,
    })
    if (status === 201) {
      notyf.success('Created Success!')
      router.push({
        name: 'products-packages-groups-:packageid',
        params: { packageid: `${packageGroup.mainPackage.packageId}` },
      })
      return
    }
    notyf.error(errMessage(message))
  }

  const fetchPackageInfo = async (id: number) => {
    const res = await getAddonPackageByMainPackageId(id)
    state.packageGroupInfo = res
  }

  return {
    ...toRefs(state),
    isEditPage,
    createPackageGroup,
    fetchPackageInfo,
    // addMainPackage,
    // addAddonPackage,
    // displayPackageNameById,
    // displayPackageImageById,
    // toggleShowAddonPackageSection,
    // toggleShowMainPackageSection,
    // createPackageGroup,
    // removePackage,
  }
}
