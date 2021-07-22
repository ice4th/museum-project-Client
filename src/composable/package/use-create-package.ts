/**
 * useCreatePackage Composition API
 */

import { onMounted, reactive, ref, toRefs, watch } from 'vue'
import PackageService from '/@src/api/package.service'
import {
  ICreateAddonPackage,
  IPackageInfo,
  IUpdateAddonPackage,
} from '/@src/types/interfaces/package.interface'
import { GenerateTicket } from '/@src/types/enums/package.enum'
import { Notyf } from 'notyf'
import { themeColors } from '/@src/utils/themeColors'
import { useRouter } from 'vue-router'
import usePackageApi from '../api/usePackageApi'

/**
 * add type for render with type
 */
export interface IAddonPackageWithType extends ICreateAddonPackage {
  type: 'main' | 'addon'
}
export interface IUseCreatePackageState {
  mainPackageId: number
  isLoadingPackages: boolean
  packages: IPackageInfo[]
  dependOnPackageList: IPackageInfo[]
  mainSelectedPackage?: IUpdateAddonPackage
  addonPackages: IUpdateAddonPackage[]
  currentAddonPackage?: IAddonPackageWithType
}

const notyfWarning = new Notyf({
  duration: 2000,
  position: {
    x: 'center',
    y: 'top',
  },
  types: [
    {
      type: 'warning',
      background: themeColors.orange,
      icon: {
        className: 'fas fa-check',
        tagName: 'i',
        text: '',
      },
    },
  ],
})
const notyfSuccess = new Notyf({
  duration: 2000,
  position: {
    x: 'center',
    y: 'top',
  },
  types: [
    {
      type: 'success',
      background: themeColors.green,
      icon: {
        className: 'fas fa-check',
        tagName: 'i',
        text: '',
      },
    },
  ],
})
export default function useCreatePackage() {
  const showAddonSection = ref<boolean>(false)
  const showMainPackageSection = ref<boolean>(true)
  const state = reactive<IUseCreatePackageState>({
    mainPackageId: 0,
    isLoadingPackages: false,
    packages: [],
    dependOnPackageList: [],
    mainSelectedPackage: undefined,
    addonPackages: [],
    currentAddonPackage: undefined,
  })
  const router = useRouter()
  const { getAllPackages } = usePackageApi()

  const displayPackageNameById = (id: number) => {
    return state.packages.find((pk) => pk.id === id)?.packageName || ''
  }

  const displayPackageImageById = (id: number) => {
    return state.packages.find((pk) => pk.id === id)?.photo || ''
  }

  const fetchAllPackage = async () => {
    state.isLoadingPackages = true
    const data = await getAllPackages({ currentPage: 1, perPage: 10 })
    state.isLoadingPackages = false
    // if (data) {
    //   state.packages = data as IPackageInfo[]
    // }
  }

  const toggleShowMainPackageSection = () => {
    showMainPackageSection.value = !showMainPackageSection.value
  }

  const toggleShowAddonPackageSection = (addon?: IAddonPackageWithType) => {
    state.currentAddonPackage = addon
    showAddonSection.value = !showAddonSection.value
  }

  const addMainPackage = (mainPk: IUpdateAddonPackage) => {
    /**
     * @info remove old main package
     */
    if (state.mainPackageId && mainPk.packageId !== state.mainPackageId) {
      state.addonPackages = state.addonPackages.filter(
        (pk) => pk.packageId !== state.mainPackageId
      )
    }
    state.mainPackageId = mainPk.packageId
    const index = state.addonPackages.findIndex(
      (pk) => pk.packageId === state.mainPackageId
    )
    if (index >= 0) {
      state.addonPackages[index] = mainPk
    } else {
      state.addonPackages = [mainPk]
        .concat(state.addonPackages)
        .map((pk, index) => {
          return { ...pk, idx: index + 1 }
        })
    }
    state.mainSelectedPackage = mainPk
    toggleShowMainPackageSection()
  }

  const addAddonPackage = (addon: IUpdateAddonPackage) => {
    if (addon.packageId === state.mainPackageId) {
      notyfWarning.open({
        type: 'warning',
        message: 'package id is duplicate main package',
      })
      return
    }
    const havePackage = state.addonPackages.some(
      (pk) => pk.packageId === addon.packageId
    )
    const isMyPackage = state.addonPackages.some((pk) => pk.idx === addon.idx)
    if (havePackage && !isMyPackage) {
      notyfWarning.open({
        type: 'warning',
        message: 'package id is duplicate',
      })
      return
    }
    if (addon.idx) {
      const index = state.addonPackages.findIndex(
        (pk) => pk.packageId === addon.packageId
      )
      state.addonPackages[index] = addon
    } else {
      state.addonPackages.push({
        ...addon,
        idx: state.addonPackages.length + 1,
      })
    }
    toggleShowAddonPackageSection()
  }

  const removePackage = async (packageId: number) => {
    state.addonPackages = await state.addonPackages
      .filter((pk) => pk.packageId !== packageId)
      .map((pk, index) => {
        return { ...pk, idx: index + 1 }
      })
  }

  const createPackageGroup = async () => {
    const { status, message } = await PackageService.createPackageGroup({
      mainPackageId: state.mainPackageId,
      addonPackages: state.addonPackages,
    })
    if (status === 201) {
      notyfSuccess.open({
        type: 'success',
        message: 'Created Success!',
      })
      router.push({
        name: 'product-package-group-:packageid',
        params: { packageid: `${state.mainPackageId}` },
      })
      return
    }
    notyfWarning.open({
      type: 'error',
      message,
    })
  }

  onMounted(async () => {
    await fetchAllPackage()
  })

  return {
    ...toRefs(state),
    showAddonSection,
    showMainPackageSection,
    addMainPackage,
    addAddonPackage,
    displayPackageNameById,
    displayPackageImageById,
    toggleShowAddonPackageSection,
    toggleShowMainPackageSection,
    createPackageGroup,
    removePackage,
  }
}
